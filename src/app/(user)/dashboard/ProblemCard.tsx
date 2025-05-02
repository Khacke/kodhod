import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Markdown from 'react-markdown';

export interface ProblemProps {
	id: bigint;
	name: string;
	description: string;
	difficulty: number;
	tags: Array<string>;
}

export default function PageCard({ name, description, difficulty, tags }: ProblemProps) {
	return (
		<Card className="max-w-3xl mb-2">
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<CardDescription>{difficulty == 1 ? 'Konnyu' : difficulty == 2 ? 'Kozepes' : 'Nehez'}</CardDescription>
				<CardContent className="!px-0">
					<ScrollArea className="h-25">
						<Markdown>{description}</Markdown>
					</ScrollArea>
				</CardContent>
				<hr />
				<CardFooter className="!px-0">
					{tags.map((t, i) => (
						<div key={i} className="bg-primary text-primary-foreground rounded text-xs p-2 mx-1">
							{t}
						</div>
					))}
				</CardFooter>
			</CardHeader>
		</Card>
	);
}
