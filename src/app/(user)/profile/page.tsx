import { auth0 } from '@/lib/auth0';
import Image from 'next/image';
import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs';
import ProfileEditForm from './ProfileEditForm';

const ProfilePictureStyle = {
	borderRadius: '100%',
	border: '1px solid #fff',
};

export default async function Profile() {
	const session = await auth0.getSession();
	const { user } = session!;

	return (
		<main className="max-w-6xl mx-auto my-8 w-1/2">
			<div className="p-4 rounded bg-secondary text-secondary-foreground">
				<div className="flex flex-row items-start relative">
					<Image
						src={user?.picture ?? `/defaultPic.svg`}
						alt="Profile picture"
						width={125}
						height={125}
						quality={80}
						loading="lazy"
						style={ProfilePictureStyle}
					/>
					<div
						className="h-[40px] w-[100px] bg-primary text-primary-foreground px-[5px] ml-5 p-2 rounded flex-grow relative"
						style={{
							clipPath: `polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%)`,
						}}
					>
						<div className="font-medium">{user.name || user.nickname}</div>
					</div>
				</div>
				<hr className="my-5 bg-secondary" />

				<Tabs>
					<TabsList defaultValue="user" className="bg-secondary rounded-xs">
						<TabsTrigger value="user">Felhasznalo</TabsTrigger>
						<TabsTrigger value="test">Test</TabsTrigger>
					</TabsList>
					<hr className="bg-secondary" />
					<TabsContent value="user">
						<ProfileEditForm user={user} />
					</TabsContent>
				</Tabs>
			</div>
		</main>
	);
}
