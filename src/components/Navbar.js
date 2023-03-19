import React from "react";

function Navbar() {
	return (
		<>
			<nav className="w-full py-1 bg-white border-b border-blue-400">
				<div className="container mx-auto flex items-center justify-between">
					<h1 className="text-xl font-medium text-blue-600">Amazon Scraper</h1>
					<ul className="flex items-center justify-between text-base text-blue-600">
						<li>
							<a className="inline-block  hover:text-blue-500 font-medium py-2 px-4 " href="/">
								Home
							</a>
						</li>
						<li>
							<a className="inline-block hover:text-blue-500 font-medium py-2 px-4 " href="/" >
								About
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
