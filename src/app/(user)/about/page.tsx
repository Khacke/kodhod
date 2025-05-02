import { Users, Target, Mail, Phone, Handshake, Instagram, Facebook } from 'lucide-react';

export default function About() {
	return (
		<main>
			<div className="min-h-screen p-6">
				<div className="max-w-4xl mx-auto">
					{/* Fejléc */}
					<header className="mb-8 text-center">
						<h1 className="text-secondary-foreground rounded text-xl font-bold underline p-2 mx-1">
							Rólunk
						</h1>
						<br></br>
						<p className="text-secondary-foreground rounded text-xl font-bold p-4 mx-1">
							Ismerd meg a történetünket és a küldetésünket:
						</p>
					</header>

					{/* Kik vagyunk? */}
					<section className="text-secondary-foreground rounded text-center text-xl p-6 rounded-lg shadow-md mb-8 mx-1 border border-gray-200">
						<h2 className="text-2xl font-semibold flex items-center justify-center mb-2 p-2">
							<Users className="w-6 h-6 text-red-500 mr-2" />
							Kik vagyunk?
						</h2>
						<p className="text-secondary-foreground">
							Egy szenvedélyes csapat vagyunk, akik hisznek az egyszerűség erejében. Célunk, hogy értéket
							teremtsünk, miközben felhasználóink és mi is folyamatosan fejlődünk és tanulunk.
						</p>
					</section>
					<br></br>

					{/* Küldetésünk */}
					<section className="p-6 rounded-lg shadow-md mb-8 text-center text-xl border border-gray-200">
						<h2 className="text-2xl font-semibold mb-4 text-secondary-foreground flex items-center justify-center">
							<Target className="w-6 h-6 text-red-500 mr-2" />
							Küldetésünk
						</h2>
						<p className="text-secondary-foreground max-w-2xl mx-auto">
							Küldetésünk, hogy innovatív, mégis felhasználóbarát megoldásokkal segítsük partnereinket a
							digitális térben. Hiszünk abban, hogy a technológia eszköz a jobb jövő építéséhez, és minden
							projektünkkel ezt a célt szolgáljuk.
						</p>
					</section>

					{/* Csapatunk */}
					<section className="p-6 rounded-lg shadow-md mb-8 text-center text-xl border border-gray-200">
						<h2 className="text-2xl font-semibold mb-4 text-secondary-foreground flex items-center justify-center">
							<Handshake className="w-6 h-6 text-red-500 mr-2" />
							Csapatunk:
						</h2>
						<p className="text-secondary-foreground max-w-2xl mx-auto">
							- Jenei András <br></br>- Bock Dávid <br></br>- Szilágyi Bence <br></br>
						</p>
					</section>

					{/* Elerhetoseg*/}
					<section className="p-6 rounded-lg shadow-md mb-8 text-center text-xl border border-gray-200">
						<h2 className="text-2xl font-semibold mb-4 text-secondary-foreground">Elérhetőségek:</h2>
						<div className="text-secondary-foreground max-w-2xl mx-auto space-y-4">
							<div className="flex items-center justify-center">
								<Mail className="w-6 h-6 text-red-500 mr-2" />
								<span>Email: khacke.hacke@gmail.com</span>
							</div>

							<div className="flex items-center justify-center">
								<Phone className="w-6 h-6 text-red-500 mr-2" />
								<span>Telefon: 06-30-123-4567</span>
							</div>

							<div className="flex items-center justify-center">
								<Facebook className="w-6 h-6 text-red-500 mr-2" />
								<span> Jenei András</span>
							</div>

							<div className="flex items-center justify-center">
								<Instagram className="w-6 h-6 text-red-500 mr-2" />
								<span> fosarviz</span>
							</div>
						</div>
					</section>

					{/* Lábléc */}
					<footer className="text-center text-sm text-gray-500 mt-12">
						&copy; 2025 Minden jog fenntartva.
					</footer>
				</div>
			</div>
		</main>
	);
}
