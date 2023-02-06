import React, { useState } from "react";

export default function NavBar() {
	const [navOpen, setNavOpen] = useState(false);
	return (
		<>
			<nav className="flex items-center justify-between w-full p-4 bg-blue-900">
				<div className="flex items-center">
					<img
						src={"/assets/logo_285.png"}
						alt="Third Dawn: Siegecraft Logo"
						className="h-12"
					/>
				</div>
				<div className="hidden md:block">
					<a
						href="#section1"
						className="mr-6 text-white hover:text-gray-300 hover:bg-blue-800"
					>
						Section 1
					</a>
					<a
						href="#section2"
						className="mr-6 text-white hover:text-gray-300 hover:bg-blue-800"
					>
						Section 2
					</a>
					<a
						href="#section3"
						className="mr-6 text-white hover:text-gray-300 hover:bg-blue-800"
					>
						Section 3
					</a>
					<button className="px-4 py-2 text-white uppercase bg-red-500 rounded hover:text-yellow-300 ">
						Order Now
					</button>
				</div>
				<div className="md:hidden">
					<button
						className="p-2 text-white"
						id="menu-button"
						onClick={() => setNavOpen(!navOpen)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							className="w-6 h-6 fill-current"
						>
							{!navOpen ? (
								<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
							) : (
								<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
							)}
						</svg>
					</button>
				</div>
				{navOpen && (
					<div
						className="absolute top-0 bottom-0 left-0 right-0 px-3 py-3 text-white bg-blue-800 md:hidden"
						id="mobile-menu"
					>
						<a
							href="#"
							className="absolute top-0 right-0 block mt-4 mr-4 text-white "
							id="close-menu-button"
							onClick={() => setNavOpen(!navOpen)}
						>
							<svg
								className="w-6 h-6 fill-current"
								viewBox="0 0 24 24"
							>
								<path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.41z" />
							</svg>
						</a>
						<a
							href="#section1"
							className="block px-2 py-4 mr-6 text-white hover:bg-blue-700 hover:text-gray-300"
						>
							Section 1
						</a>
						<a
							href="#section2"
							className="block px-2 py-4 mr-6 text-white hover:bg-blue-700 hover:text-gray-300"
						>
							Section 2
						</a>
						<a
							href="#section3"
							className="block px-2 py-4 mr-6 text-white hover:bg-blue-700 hover:text-gray-300"
						>
							Section 3
						</a>
						<button className="px-4 py-2 text-white uppercase bg-red-500 rounded hover:text-yellow-300 ">
							Order Now
						</button>
					</div>
				)}
			</nav>
		</>
	);
}
