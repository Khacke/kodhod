import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
	return (
		<nav className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background border-b border-border">
			<div>Kodhod</div>
			<div className="flex items-center space-x-4">
				<Link href="/auth/login" className="hover:underline text-text">
					Belepes
				</Link>
				<ThemeToggle />
			</div>
		</nav>
	);
}
