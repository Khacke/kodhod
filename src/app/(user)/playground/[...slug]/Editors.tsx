'use client';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import { idToLangFn } from '@/lib/langs';
import { Button } from '@/components/ui/button';
import { dracula } from '@uiw/codemirror-theme-dracula';

export default function Editors({
	starter_code,
	test_code,
	language,
	userId,
	handleTestAction,
	handleSubmitAction,
	setOutput,
	setColor,
	setActive,
}: {
	starter_code: string;
	test_code: string;
	language: string;
	userId: string;
	// eslint-disable-next-line
	handleTestAction: (code: string, lId: string, test: string, userId: string) => any;
	// eslint-disable-next-line
	handleSubmitAction: (code: string, lId: string, test: string, userId: string) => any;
	setOutput: (output: string) => void;
	setColor: (color: string) => void;
	setActive: (active: string) => void;
}) {
	const [code, setCode] = useState(starter_code);
	// eslint-disable-next-line
	const [test, _setTest] = useState(test_code);

	const cmFn = idToLangFn[parseInt(language, 10) as keyof typeof idToLangFn];

	async function handleAction(action: 'test' | 'submit') {
		const res = await (action == 'test'
			? handleTestAction(code, language, test, userId)
			: handleSubmitAction(code, language, test, userId));

		if (res.exitCode == 0) {
			setColor('text-green-600 bold');
			setOutput('Sikeres futtatas');
		}
		if (res.exitCode == 1) {
			setColor('text-red-600 bold');
			setOutput(res.stdErr);
		}
		if (res.timedOut) {
			setColor('text-red-600 bold');
			setOutput('timed out');
		}
		setActive('output');
	}

	return (
		<ResizablePanelGroup direction="vertical" className="h-screen">
			<ResizablePanel defaultSize={50} minSize={20} className="flex flex-col h-full">
				<h1 className="px-3 w-full bg-secondary text-secondary-foreground text-lg rounded-t-lg">
					Te megoldasod
				</h1>
				<div className="flex-grow h-full overflow-auto">
					<CodeMirror
						value={code}
						extensions={[cmFn]}
						className="!h-full"
						theme={dracula}
						onChange={(v) => setCode(v)}
					/>
				</div>
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize={50} minSize={20} className="flex flex-col h-full">
				<h1 className="px-3 w-full bg-secondary text-secondary-foreground text-lg rounded-t-lg">Teszt kod</h1>
				<div className="flex-grow h-full overflow-auto">
					<CodeMirror value={test} extensions={[cmFn]} className="!h-full" theme={dracula} readOnly />
				</div>
			</ResizablePanel>
			<div className="flex flex-row gap-2 w-full">
				<Button onClick={() => handleAction('test')} className="w-1/2">
					Teszt
				</Button>
				<Button onClick={() => handleAction('submit')} className="w-1/2 bg-green-500">
					Bekuldes
				</Button>
			</div>
		</ResizablePanelGroup>
	);
}
