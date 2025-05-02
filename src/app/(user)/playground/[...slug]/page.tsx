import sql from '@/lib/db';
import { ResizablePanelGroup } from '@/components/ui/resizable';
import { executeCode } from '@/lib/execute';
import { auth0 } from '@/lib/auth0';
import Wrapper from './Wrapper';

export default async function Playground({ params }: { params: Promise<{ slug: string[] }> }) {
	const { slug } = await params;
	const pId = slug[0];
	const lId = slug[1];

	const session = await auth0.getSession();
	const userId = session?.user?.sub;

	const problem = await getProblem(pId, lId);

	return (
		<main className="h-screen w-full">
			<ResizablePanelGroup direction="horizontal" className="min-h-screen rounded-lg border">
				<Wrapper
					problem={problem}
					lId={lId}
					userId={userId}
					handleSubmitAction={handleSubmitAction}
					handleTestAction={handleTestAction}
				/>
			</ResizablePanelGroup>
		</main>
	);
}

async function handleSubmitAction(code: string, lId: string, test: string, userId: string) {
	'use server';
	return await executeCode(parseInt(lId, 10), code, test, userId);
}

async function handleTestAction(code: string, lId: string, test: string, userId: string) {
	'use server';
	return await executeCode(parseInt(lId, 10), code, test, userId);
}

async function getProblem(pId: string, lId: string) {
	const [problem] = await sql`
        SELECT
            p.name,
            p.description,
            p.difficulty,
            ep.starter_code,
            ep.test_code,
            l.id,
            ARRAY_AGG(t.tag) as tags
        FROM problems p 
        JOIN extended_problems ep ON ep.problem_id = p.id
        JOIN problem_languages pl ON pl.problem_id = p.id
        JOIN languages l ON pl.language_id = l.id
        JOIN problem_tags pt on pt.problem_id = p.id
        JOIN tags t ON pt.tag_id = t.id
        GROUP BY p.name, p.description, p.difficulty, ep.starter_code, ep.test_code, l.id, p.id
        HAVING p.id = ${pId} AND l.id = ${lId}
    `;

	return problem;
}
