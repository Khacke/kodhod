import { Language, Tag, Difficulty } from '@/models/store';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
	pLang: bigint | undefined;
	pTag: bigint | undefined;
	pDiff: number | undefined;
	languages: Array<Language>;
	tags: Array<Tag>;
	difficulties: Array<Difficulty>;
};
export default function RandomProblemForm({ pLang, pTag, pDiff, languages, tags, difficulties }: Props) {
	return (
		<div className="">
			<div className="space-y-4">
				<h1 className="text-xl font-semibold mb-6">Random Feladat Kereso</h1>
				{/* Language */}
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" className="w-[180px] justify-start mx-2">
							{languages.find((l) => l.id == pLang)?.language ?? 'Nyelv'}
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						{languages.map((l) => (
							<Link key={l.id} href={`?lang=${l.id}`} replace scroll={false}>
								<Button className="m-1 bg-secondary">{l.language}</Button>
							</Link>
						))}
					</PopoverContent>
				</Popover>
				{/* Difficulty */}
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" className="w-[180px] justify-start mx-2">
							{difficulties.find((d) => d.diff == pDiff)?.diff ?? 'Nehezseg'}
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						{difficulties.map((d, i) => (
							<Link key={i} href={`?diff=${d.diff}`} replace scroll={false}>
								<Button className="m-1 bg-secondary">{d.diff}</Button>
							</Link>
						))}
					</PopoverContent>
				</Popover>
				{/* Language */}
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" className="w-[180px] justify-start mx-2">
							{tags.find((t) => t.id == pTag)?.tag ?? 'Tagek'}
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						{tags.map((t) => (
							<Link key={t.id} href={`?tag=${t.id}`} replace scroll={false}>
								<Button className="m-1 bg-secondary">{t.tag}</Button>
							</Link>
						))}
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
