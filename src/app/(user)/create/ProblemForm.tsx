'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useForm } from 'react-hook-form';
import { schema } from './formSchema';
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import { Language, Tag } from '@/models/store';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { idToLangFn } from '@/lib/langs';
import InitializedMDXEditor from '@/components/InitializedMDXEditor';
import { onSubmitAction } from './createProblemSubmit';
import { toast } from 'sonner';

export default function CreateProblem({
	tags,
	languages,
	testCases,
}: {
	tags: Array<Tag>;
	languages: Array<Language>;
	testCases: Array<{ id: number; language_id: number; example: string }>;
}) {
	const form = useForm<z.output<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: '',
			description: '',
			language: 1,
			difficulty: 1,
		},
	});
	const formRef = useRef<HTMLFormElement>(null);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', form.getValues('title'));
		formData.append('description', form.getValues('description'));
		formData.append('tags', JSON.stringify(form.getValues('tags')));
		formData.append('language', form.getValues('language').toString());
		formData.append('difficulty', form.getValues('difficulty').toString());
		formData.append('startingCode', form.getValues('startingCode'));
		formData.append('testCode', form.getValues('testCode'));

		startTransition(() => {
			formAction(formData);
		});
	}

	const [state, formAction, isPending] = useActionState(onSubmitAction, {
		success: false,
		message: '',
	});

	useEffect(() => {
		if (state.message != '') {
			toast(state.message);
		}
	}, [state]);

	return (
		<Form {...form}>
			<form ref={formRef} className="flex h-screen flex-col w-full" onSubmit={handleSubmit}>
				<div className="flex-1 p-6">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Feladat cime</FormLabel>
								<FormControl>
									<Input placeholder="Feladat cime" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => {
							const description = form.watch('description');
							return (
								<FormItem>
									<FormLabel>Feladat leirasa</FormLabel>
									<FormControl>
										<InitializedMDXEditor
											className="mb-2 w-full rounded-xl bg-primary text-primary-foreground"
											onChange={(v) => field.onChange(v)}
											markdown={description}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<div className="flex flex-row justify-between w-full">
						<TagSelect control={form.control} name="tags" tags={tags} />
						<FormField
							control={form.control}
							name="language"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Programozasi nyelv</FormLabel>
									<FormControl>
										<select
											className="w-[400px] p-2 border rounded-md"
											onChange={(e) => field.onChange(Number(e.target.value))}
										>
											{languages.map((l) => (
												<option
													key={parseInt(l.id.toString())}
													value={parseInt(l.id.toString())}
												>
													{l.language}
												</option>
											))}
										</select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="difficulty"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nehezseg</FormLabel>
									<FormControl>
										<select
											className="w-[400px] p-2 border rounded-md"
											onChange={(e) => field.onChange(Number(e.target.value))}
										>
											{[
												{ id: 1, diff: 'Konnyu' },
												{ id: 2, diff: 'Kozepes' },
												{ id: 3, diff: 'Nehez' },
											].map((d) => (
												<option key={d.id} value={d.id}>
													{d.diff}
												</option>
											))}
										</select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex flex-row gap-4 my-2">
						<FormField
							control={form.control}
							name="startingCode"
							render={({ field }) => {
								const selectedLanguage = form.watch('language');
								const languageExtension = idToLangFn[selectedLanguage as keyof typeof idToLangFn];
								return (
									<FormItem className="w-full">
										<FormLabel>Kod</FormLabel>
										<FormControl>
											<CodeMirror
												{...field}
												theme={dracula}
												height="400px"
												extensions={languageExtension ? [languageExtension] : []}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>
					<div className="flex flex-row gap-4 my-2">
						<FormField
							control={form.control}
							name="testCode"
							render={({ field }) => {
								const selectedLanguage = form.watch('language');
								const languageExtension = idToLangFn[selectedLanguage as keyof typeof idToLangFn];
								return (
									<FormItem className="w-1/2">
										<FormLabel>Teszt</FormLabel>
										<FormControl>
											<CodeMirror
												{...field}
												theme={dracula}
												height="400px"
												extensions={languageExtension ? [languageExtension] : []}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="testCodeExample"
							render={() => {
								const selectedLanguage = form.watch('language');
								const languageExtension = idToLangFn[selectedLanguage as keyof typeof idToLangFn];
								const testExample =
									testCases.filter((t) => t.language_id == selectedLanguage)[0]?.example ?? '';
								return (
									<FormItem className="w-1/2">
										<FormLabel>Teszt pelda</FormLabel>
										<FormControl>
											<CodeMirror
												value={testExample}
												theme={dracula}
												height="400px"
												extensions={languageExtension ? [languageExtension] : []}
												readOnly
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>
				</div>
				<Button type="submit" disabled={isPending}>
					Letrehozas
				</Button>
			</form>
		</Form>
	);
}

// eslint-disable-next-line
function TagSelect({ control, name, tags }: { control: Control<any>; name: string; tags: Array<Tag> }) {
	const [open, setOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const filteredTags = tags.filter((t) => t.tag.toLowerCase().includes(searchQuery.toLowerCase()));

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Tagek</FormLabel>
					<Popover open={open} onOpenChange={setOpen}>
						<FormControl>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={open}
									className="w-[400px] justify-between"
								>
									Valassz tag-eket
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opcaity-50" />
								</Button>
							</PopoverTrigger>
						</FormControl>
						<PopoverContent className="w-[400px] p-0" align="start">
							<Command>
								<CommandInput
									placeholder="keress tageket..."
									value={searchQuery}
									onValueChange={setSearchQuery}
								/>
								<CommandEmpty>Nincs ilyen tag, hozd letre</CommandEmpty>
								<CommandGroup className="max-h-18 overflow-y-auto">
									{filteredTags.map((t) => (
										<CommandItem
											key={t.id}
											value={t.tag}
											onSelect={() => {
												const currentValue = field.value || [];
												const newValue = currentValue.includes(parseInt(t.id.toString()))
													? currentValue.filter(
															(id: number) => id != parseInt(t.id.toString())
														)
													: [...currentValue, t.id];
												field.onChange(newValue);
												setSearchQuery('');
											}}
										>
											<Check
												className={cn(
													'mr-2 h-4 w-4',
													field.value?.includes(parseInt(t.id.toString()))
														? 'opacity-100'
														: 'opacity-0'
												)}
											/>
											{t.tag}
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
					<div className="flex flex-wrap gap-2">
						{field.value?.map((id: number) => {
							const tag = tags.find((t) => parseInt(t.id.toString()) == id);
							return (
								<Badge
									key={id}
									variant="outline"
									className="cursor-pointer hover:bg-secondary"
									onClick={() => {
										const newValue = field.value.filter(
											(i: number) => i != parseInt(id.toString())
										);
										field.onChange(newValue);
									}}
								>
									{tag?.tag}
									<X className="ml-1 h-3 w-3" />
								</Badge>
							);
						})}
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
