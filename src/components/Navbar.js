import React from "react";
import { Link } from "react-router-dom"

function Navbar() {
	return (
		<>
			<nav className="w-full py-1 bg-white border-b border-blue-400">
				<div className="container mx-auto flex items-center justify-between">
					<h1 className="text-xl font-medium text-blue-600">
						<Link to="/">Amazon Scraper</Link>
					</h1>
					<ul className="flex items-center justify-between text-base text-blue-600">
						<li>
							<Link className="inline-block  hover:text-blue-500 font-medium py-2 px-4 " to="/">
								Home
							</Link>
						</li>
						<li>
							<Link className="inline-block hover:text-blue-500 font-medium py-2 px-4 " to="/about" >
								About
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
