'use server';

import { auth0 } from '@/lib/auth0';
import { schema } from './formSchema';
import sql from '@/lib/db';

export async function onSubmitAction(
	prevState: { success: boolean; message: string },
	data: FormData
): Promise<{ success: boolean; message: string }> {
	const session = await auth0.getSession();

	const { sub } = session!.user;

	if (!sub) {
		return {
			success: false,
			message: 'User auth failed',
		};
	}

	const rawData = {
		title: data.get('title'),
		description: data.get('description'),
		language: Number(data.get('language')),
		difficulty: Number(data.get('difficulty')),
		tags: JSON.parse(data.get('tags') as string) as number[],
		startingCode: data.get('startingCode'),
		testCode: data.get('testCode'),
	};
	const parsed = schema.safeParse(rawData);

	if (!parsed.success) {
		return {
			success: false,
			message: 'Invalid form data',
		};
	}

	const { title, description, language, difficulty, tags, startingCode, testCode } = parsed.data;

	try {
		const [{ id }] = await sql`
            INSERT INTO problems(name, description, difficulty) VALUES(${title}, ${description}, ${difficulty}) returning id;
        `;
		await sql`
            INSERT INTO extended_problems(problem_id, user_id, starter_code, test_code) VALUES(${id}, ${sub}, ${startingCode}, ${testCode});
        `;
		await sql`
            INSERT INTO problem_statistics(problem_id) VALUES(${id});
        `;
		await sql`
            INSERT INTO problem_languages(problem_id, language_id) VALUES(${id}, ${language});
        `;
		for (const tag of tags) {
			await sql`INSERT INTO problem_tags(problem_id, tag_id) VALUES(${id}, ${tag});`;
		}
	} catch (e) {
		console.error((e as Error).message);
		return {
			success: false,
			message: 'Internal server error',
		};
	}

	return {
		success: true,
		message: 'Sikeresen letrehozva',
	};
}
