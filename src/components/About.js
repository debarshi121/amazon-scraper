import React from "react";

function About() {
	return (
		<div className="bg-gray-100 min-h-screen">
			<div className="container mx-auto py-5">
				<div className="bg-gray-50 p-5 mt-5">
                	<h1 className="text-lg font-medium mb-5">About Amazon Scraper</h1>
					<p>Amazon Scraper is a scraping tool to grab the details of various products on Amazon (India).</p>
					<p>You can grab details like product image, title, description, price, ratings & reviews of the product.</p>

					<div className="mt-10">
						<p>Designed & Developed by - Debarshi Das</p>
						<p className="text-sm text-gray-600">debarshi121@gmail.com</p>
						<p className="text-sm"><a href="https://debarshi.vercel.app/" target="_blank" rel="noreferrer" className="text-blue-500">https://debarshi.vercel.app/</a></p>
					</div>
				</div>
            </div>
		</div>
	);
}

export default About;