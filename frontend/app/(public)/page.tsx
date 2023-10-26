import { Search } from "@/components/common/search/search";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>RESCON</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
				The Premier Postgraduate Research Congress of Sri Lanka.
				</h2>
				<Search />
			</div>
		</section>
	);
}
