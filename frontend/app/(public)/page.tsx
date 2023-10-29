'use client'

import { title, subtitle } from "@/components/primitives";
import styles from '@/styles/home.module.css';
import Banner from "@/components/common/banner/banner";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4">
			<Banner />
			<div className="inline-block max-w-2xl text-center justify-center">
				
			</div>
		</section>
	);
}
