'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	const toggleTheme = useCallback(() => {
		setTheme(theme == 'dark' ? 'light' : 'dark');
	}, [theme, setTheme]);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button variant="ghost" size="icon">
				<Sun className="w-[24px] h-[24px]" />
			</Button>
		);
	}

	return (
		<Button variant="ghost" size="icon" onClick={toggleTheme}>
			{theme == 'dark' ? <Moon className="w-[24px] h-[24px]" /> : <Sun className="w-[24px] h-[24px]" />}
		</Button>
	);
}
