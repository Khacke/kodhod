import sql from '@/lib/db';
import { formatDate } from '@/lib/formatDate';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Markdown from 'react-markdown';
import { getUserById } from '@/lib/getUserById';

export default async function Problem({ params }: { params: Promise<{ slug: string[] }> }) {
	const { slug } = await params;
	const pId = slug[0];
	const lId = slug[1];

	const [
		// eslint-disable-next-line
		{ name, description, difficulty, tags, user_id, created_at, updated_at, likes, dislikes, stars, language_id },
	] = await sql`
        SELECT * FROM full_problems_v WHERE id = ${pId}
        ${lId ? sql`AND language_id = ${lId}` : sql``}
    `;
	const user = getUserById(user_id);

	return (
		<div className="p-8 min-h-screen flex justify-center items-center w-full">
			<div className="bg-secondary shadow-lg rounded-lg p-6 w-full max-w-3xl text-secondary-foreground">
				{/* Title */}
				<h1 className="text-3xl font-bold mb-4">{name}</h1>
				<hr />
				{/* User info */}
				<div className="flex justify-between items-center mb-4 text-sm">
					<div>
						<span className="font-semibold">Szerzo: </span>
						{user}
					</div>
					<div className="text-right">
						<div>
							<span className="font-semibold">Keszult: </span>
							{formatDate(created_at)}
						</div>
						<div>
							<span className="font-semibold">Frissitve: </span>
							{formatDate(updated_at)}
						</div>
					</div>
				</div>
				<div className="flex items-center space-x-4 mb-4">
					{/* Difficulty */}
					<span
						className={`px-3 py-1 rounded text-sm font-semibold ${difficulty == 1 ? 'bg-green-200 text-green-700' : difficulty == 2 ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-700'}`}
					>
						Nehezsegi fokozat: {difficulty == 1 ? 'Konnyu' : difficulty == 2 ? 'Kozepes' : 'Nehez'}
					</span>
					{/* Tags */}
					<div className="fle space-x-2">
						{tags.map((t: string, i: number) => (
							<span
								key={i}
								className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs font-semibold"
							>
								{t}
							</span>
						))}
					</div>
				</div>
				<hr />

				{/* Description */}
				<div className="mb-4">
					<Markdown>{description}</Markdown>
				</div>

				<Link href={`/playground/${pId}/${lId ?? language_id}`}>
					<Button className="bg-green-500 font-semibold">Megoldas</Button>
				</Link>
			</div>
		</div>
	);
}
