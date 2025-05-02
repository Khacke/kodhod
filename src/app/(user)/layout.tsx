import type { Metadata } from 'next';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'elegge egyertelmu',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarTrigger className="fixed top-1 right-1 z-50" />
			{children}
		</SidebarProvider>
	);
}
