import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
	MdOutlineSpaceDashboard,
	MdArrowUpward,
	MdAddCircle,
	MdFormatListNumbered,
	MdOutlineMoreHoriz,
} from 'react-icons/md';
import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ThemeToggle from '@/components/ThemeToggle';
import { auth0 } from '@/lib/auth0';
import Image from 'next/image';

const items = [
	{
		title: 'Dashboard',
		url: '/dashboard',
		icon: MdOutlineSpaceDashboard,
	},
	{
		title: 'Create',
		url: '/create',
		icon: MdAddCircle,
	},
	{
		title: 'Leaderboard',
		url: '/leaderboard',
		icon: MdFormatListNumbered,
	},
	{
		title: 'About',
		url: '/about',
		icon: MdOutlineMoreHoriz,
	},
];

async function MyAvatar() {
	const session = await auth0.getSession();

	return (
		<Avatar className="h-[26px] w-[26px]">
			<AvatarImage src={session!.user!.picture!} />
			<AvatarFallback>PP</AvatarFallback>
		</Avatar>
	);
}
function MySidebarHeader() {
	return (
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem key="Home">
					<SidebarMenuButton asChild>
						<Link href="/" className="text-xl">
							<Image src="/kodhod.png" alt="Kodhod logo" width={24} height={24} quality={50} />
							<span>KodHod</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	);
}

function MySidebarFooter() {
	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<ThemeToggle />
				</SidebarMenuItem>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton className="flex flex-row group-data-[collapsible=icon]:!p-[3px]">
								<MyAvatar />
								<MdArrowUpward className="ml-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
							<DropdownMenuItem>
								<Link className="w-full" href="/profile">
									Profile
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href="/auth/logout" className="text-destructive w-full">
									Log out
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
export default async function AppSidebar() {
	return (
		<Sidebar collapsible="icon">
			<MySidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<MySidebarFooter />
		</Sidebar>
	);
}
