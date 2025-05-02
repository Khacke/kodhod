import { Users, Target, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Navbar from './Navbar';
import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
	const session = await auth0.getSession();

	if (session) redirect('/dashboard');

	return (
		<>
			<Navbar />
			<main>
				{/* Hero Section with Background Image */}
				<div className="relative flex justify-center items-center h-screen overflow-hidden h-96">
					{/* Background Image */}
					<div className="absolute inset-0 z-0">
						<Image
							src="/code-hero.png"
							alt="Hero Background"
							fill
							style={{
								objectFit: 'cover',
							}}
							quality={100}
						/>
					</div>

					{/* Kodhod Content */}
					<div className="relative z-20 flex flex-col items-center space-y-8">
						<Image
							src="/kodhod.png"
							alt="KodHod"
							width={250}
							height={250}
							className="rounded-full object-cover"
						/>
						<h1 className="text-8xl text-center font-bold text-white">KódHód</h1>
					</div>
				</div>
				<section className="bg-secondary text-secondary-foreground py-20">
					<div className="container mx-auto px-4 text-center">
						<h1 className="text-4xl font-bold mb-4 relative">Fejleszd a programozói tudásod</h1>
						<p className="text-xl mb-8 ">
							Csatlakozz és oldj meg komplex feladatokat hogy minél jobb képességek birtokába kerülj.
						</p>

						<a
							href="/auth/login"
							className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-gray-500"
						>
							Belevágok!
						</a>
					</div>
				</section>

				<section className="py-16 ">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold text-center mb-12">Miért pont mi?</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="bg-secondary p-6 rounded-lg shadow-md text-center">
								<div className="flex items-center justify-center space-x-2 mb-4">
									<Target className="w-6 h-6 text-red-500" />
									<h3 className="text-2xl font-bold">Kihívások</h3>
								</div>
								<p className="text-secondary-foreground">
									Oldj meg változatos programozási kihívásokat többféle nyelven!
								</p>
							</div>

							<div className="bg-secondary p-6 rounded-lg shadow-md text-center">
								<div className="flex items-center justify-center space-x-2 mb-4">
									<Users className="w-6 h-6 text-blue-500" />
									<h3 className="text-2xl font-bold">Közösség</h3>
								</div>
								<p className="text-secondary-foreground">
									Lépj be egy élénk fejlesztői közösségbe, és mérkőzz meg a ranglista éléért!
								</p>
							</div>

							<div className="bg-secondary p-6 rounded-lg shadow-md text-center">
								<div className="flex items-center justify-center space-x-2 mb-4">
									<TrendingUp className="w-6 h-6 text-green-500" />
									<h3 className="text-2xl font-bold">Fejlődés</h3>
								</div>
								<p className="text-secondary-foreground">
									Kövesd nyomon ahogy idővel egyre jobb és jobb leszel!
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex items-center justify-between p-4 bg-background border-b border-border">
				<div>Kodhod© 2025</div>
				<div className="flex flex-row gap-5">
					<Link href="/impresszum">Impresszum</Link>
					<Link href="/aszf">ASzF.</Link>
					<Link href="/any">Adatvedelmi Nyilatkozat</Link>
				</div>
			</footer>
		</>
	);
}
