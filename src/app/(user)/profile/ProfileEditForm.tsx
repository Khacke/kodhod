'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { schema } from './formSchema';
import { User } from '@auth0/nextjs-auth0/types';
import { useEffect, useState } from 'react';

export default function ProfileEditForm({ user }: { user: User }) {
	const form = useForm<z.output<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			username: user.name,
			image: undefined,
		},
	});
	const [previewImage, setPreviewImage] = useState(user?.picture || '');
	const image = form.watch('image');

	useEffect(() => {
		if (image instanceof File) {
			const reader = new FileReader();
			reader.onload = () => {
				setPreviewImage(reader.result as string);
			};
			reader.readAsDataURL(image);
		}
	}, [image]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(console.log)}>
				<div className="flex flex-row">
					<div className="m-2 p-2 w-1/2">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Felhasznalonev</FormLabel>
									<FormControl>
										<Input placeholder="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="m-2 p-2 w-1/2">
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Profilkep</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept="images/*"
											placeholder=""
											onChange={(e) => field.onChange(e.target.files?.[0])}
										/>
									</FormControl>
									<FormDescription>
										Profil kep valtoztatasa <br /> Elfogadott: .jpeg, .jpg, .png, .webp
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="pt-2 flex align-items-center justify-center">
							<Image src={previewImage} alt="profile preview" width={150} height={150} />
						</div>
					</div>
				</div>
				<Button className="bg-green-500 mx-3" type="submit" disabled>
					Jelenleg nem mukodik
				</Button>
			</form>
		</Form>
	);
}
