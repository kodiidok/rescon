'use client'

import { Search } from "@/components/common/search/search";
import { title, subtitle } from "@/components/primitives";
import { Image } from "@nextui-org/react";
import styles from '@/styles/home.module.css';

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-2xl text-center justify-center">
				<div className={styles.imageContainer}>
					<Image className={styles.image} src="mascot.jpg" alt="kotiya" />
				</div>
				<div className={styles.imageContainer}>
					<Image src="rescon logo.JPG" alt="rescon 23 logo" />
				</div>
				<>
					<h1 className={title()}>RESCON</h1>
					<h2 className={subtitle({ class: "mt-4" })}>
						The Premier Postgraduate Research Congress of Sri Lanka.
					</h2>
				</>
				<Search />
			</div>
		</section>
	);
}
