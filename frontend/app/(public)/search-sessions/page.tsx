'use client'

import { Search } from "@/components/common/search/search";

import Banner from "@/components/common/banner/banner";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4">
			<Banner />
			<div className="inline-block w-unit-9xl text-center justify-center">
				<Search />
			</div>
		</section>
	);
}
