'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable';
import Editors from './Editors';
import Markdown from 'react-markdown';
import OutputDisplay from './OutputDisaply';
import { useState } from 'react';

export default function Wrapper({
	problem,
	lId,
	userId,
	handleTestAction,
	handleSubmitAction,
}: {
	// eslint-disable-next-line
	problem: any;
	lId: string;
	userId?: string;
	handleTestAction: (code: string, lId: string, test: string, userId: string) => void;
	handleSubmitAction: (code: string, lId: string, test: string, userId: string) => void;
}) {
	const [output, setOutput] = useState('');
	const [color, setColor] = useState('');
	const [active, setActive] = useState('description');

	return (
		<>
			<ResizablePanel defaultSize={50} minSize={20}>
				<Tabs value={active} onValueChange={(value) => setActive(value)} defaultValue="description">
					<TabsList className="w-full bg-background">
						<TabsTrigger value="description">Feladat leiras</TabsTrigger>
						<TabsTrigger value="output">Eredmeny</TabsTrigger>
					</TabsList>
					<TabsContent value="description">
						<ScrollArea className="h-full w-full p-4">
							<h1 className="text-3xl font-semibold mb-4">{problem.name}</h1>
							<hr />
							<Markdown>{problem.description}</Markdown>
							<hr className="mt-5" />
							<div className="flex flex-row gap-2 m-2">
								{problem.tags.map((t: string, i: number) => (
									<div key={i} className="bg-primary text-primary-foreground text-xs p-1 rounded">
										{t}
									</div>
								))}
							</div>
						</ScrollArea>
					</TabsContent>
					<TabsContent value="output">
						<OutputDisplay output={output} color={color} />
					</TabsContent>
				</Tabs>
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize={50} minSize={20}>
				<Editors
					starter_code={problem.starter_code}
					test_code={problem.test_code}
					language={lId}
					userId={userId ?? 'guest'}
					handleTestAction={handleTestAction}
					handleSubmitAction={handleSubmitAction}
					setOutput={setOutput}
					setColor={setColor}
					setActive={setActive}
				/>
			</ResizablePanel>
		</>
	);
}
