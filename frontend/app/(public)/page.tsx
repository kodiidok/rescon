'use client'

import { title, subtitle } from "@/components/primitives";
import styles from '@/styles/home.module.css';
import Banner from "@/components/common/banner/banner";
import HomePageCards from "@/components/cards/homepage-cards";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4">
			<Banner />
			<div className="inline-block text-center justify-center w-9/12 mt-5">
				<HomePageCards />
			</div>
		</section>
	);
}
