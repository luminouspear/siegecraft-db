import React from "react";
import CardList from "./CardList";

export default function CardDatabase() {
	return (
		<>
			<section className="w-full bg-black">
				<main className="container items-center justify-center mx-auto w-full py-12 align-middle">
										<CardList />
				</main>
			</section>
		</>
	);
}
