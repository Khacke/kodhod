import sql from '@/lib/db';
import type { Metadata } from 'next';
import { Language, Tag, Difficulty } from '@/models/store';
import Link from 'next/link';
import ProblemCard, { ProblemProps } from './ProblemCard';
import RandomProblemForm from './RandomProblemForm';
import { headers } from 'next/headers';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'elegge egyertelmu',
};

export default async function Dashboard({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const params = await searchParams;
	const pLanguage = params.lang ? BigInt(params.lang as string) : undefined;
	const pTag = params.tag ? BigInt(params.tag as string) : undefined;
	const pDiff = params.diff ? parseInt(params.diff as string, 10) : undefined;

	const languages: Array<Language> = await sql`SELECT * FROM languages`;
	const tags: Array<Tag> = await sql`SELECT * FROM tags`;
	const difficulties: Array<Difficulty> = await sql`SELECT DISTINCT difficulty as diff from problems`;

	const pId = await getRandomProblem(pLanguage, pTag, pDiff);

	const [problem] = await sql<ProblemProps[]>`
        SELECT 
            p.*,
            ARRAY_AGG(t.tag) as tags
        FROM problems p
        JOIN problem_tags pt ON pt.problem_id = p.id
        JOIN tags t ON pt.tag_id = t.id
        GROUP BY p.id
        HAVING p.id = ${pId.toString()}
    `;

	const header = await headers();

	for (const [key, value] of header) {
		console.log(`${key} ${value}`);
	}

	const endpoint = header.get('referer');

	return (
		<div className="m-auto">
			<RandomProblemForm
				pLang={pLanguage}
				pTag={pTag}
				pDiff={pDiff}
				languages={languages}
				tags={tags}
				difficulties={difficulties}
			/>
			{problem ? (
				<>
					<Link href={`/problem/${pId}${pLanguage !== undefined ? '/' + pLanguage.toString() : ''}`}>
						<ProblemCard {...problem} />
					</Link>

					<Link
						href={endpoint ?? '/dashboard'}
						className="bg-primary text-primary-foreground p-2 rounded-lg inline-block text-center w-full"
					>
						Kihagyom
					</Link>
				</>
			) : (
				'Sajnos nincs ilyen feladatunk'
			)}
		</div>
	);
}

async function getRandomProblem(
	lang: bigint | undefined,
	tag: bigint | undefined,
	diff: number | undefined
): Promise<bigint> {
	const res = await sql`
        SELECT 
            p.id 
        FROM problems p 
        JOIN problem_tags pt ON pt.problem_id = p.id
        JOIN tags t ON pt.tag_id = t.id
        JOIN problem_languages pl ON pl.problem_id = p.id
        JOIN languages l ON pl.language_id = l.id
        WHERE 1=1
        ${diff ? sql` AND p.difficulty = ${diff.toString()}` : sql``}
        ${lang ? sql` AND l.id = ${lang.toString()}` : sql``}
        ${tag ? sql` AND t.id = ${tag.toString()}` : sql``}
        ORDER BY RANDOM()
        LIMIT 1
    `;

	return res[0]?.id ?? BigInt(-1);
}
