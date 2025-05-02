'use client';
import type { ForwardedRef } from 'react';
import {
	headingsPlugin,
	listsPlugin,
	quotePlugin,
	thematicBreakPlugin,
	markdownShortcutPlugin,
	MDXEditor,
	type MDXEditorMethods,
	type MDXEditorProps,
	UndoRedo,
	BoldItalicUnderlineToggles,
	InsertCodeBlock,
	InsertTable,
	toolbarPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

export default function InitializedMDXEditor({
	editorRef,
	...props
}: {
	editorRef?: ForwardedRef<MDXEditorMethods> | null;
} & MDXEditorProps) {
	return (
		<MDXEditor
			plugins={[
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
				toolbarPlugin({
					toolbarClassName: 'MDToolbar',
					toolbarContents: () => (
						<>
							<UndoRedo />
							<BoldItalicUnderlineToggles />
							<InsertCodeBlock />
							<InsertTable />
						</>
					),
				}),
			]}
			{...props}
			ref={editorRef}
		/>
	);
}
