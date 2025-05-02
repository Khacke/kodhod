'use client';

export default function OutputDisplay({ output, color }: { output: string; color: string }) {
	return (
		<div className={`w-full m-4 rounded ${color} pr-5 text-wrap`}>
			<pre>{output}</pre>
		</div>
	);
}
