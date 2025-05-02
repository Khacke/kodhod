import sql from '@/lib/db';
import CreateProblem from './ProblemForm';
import { Language, Tag } from '@/models/store';
import { Suspense } from 'react';

export default async function Create() {
	const tags = await sql<Array<Tag>>`
        select * from tags;
    `;
	const languages = await sql<Array<Language>>`
        select * from languages;
    `;

	const testCases = await sql<Array<{ id: number; language_id: number; example: string }>>`
        select * from test_examples;
    `;

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<CreateProblem tags={tags} languages={languages} testCases={testCases} />
		</Suspense>
	);
}
