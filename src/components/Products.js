import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";

const Products = () => {
	const [progress, setProgress] = useState(0);
	const [products, setProducts] = useState([]);
	const [keyword, setKeyword] = useState("");
	const fetchProducts = async () => {
		setProgress(10);
		setProducts([]);
		setProgress(20);
		try {
			const res = await axios.get(`http://127.0.0.1:3005/products?keyword=${keyword}`);
			setProgress(70);
			setProducts(res.data.products.result);
			setProgress(100);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="bg-gray-100 min-h-screen">
			<LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
			<div className="container mx-auto py-5">
				<div className="grid grid-cols-3 gap-3">
					<div className="flex">
						<div className="px-2 py-2 border-l border-t border-b bg-gray-200">Keyword</div>
						<input className="border px-2 py-2 flex-1" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(event) => event.keyCode === 13 && fetchProducts()} placeholder="Product name"></input>
					</div>
					<div>
						<button onClick={fetchProducts} className="border border-blue-500 px-2 py-2 rounded-sm bg-blue-100 font-medium">
							Get Products
						</button>
					</div>
				</div>
			</div>
			{products.length > 0 && (
				<div className="container mx-auto py-5">
					<div className="bg-white shadow-md rounded overflow-x-auto">
						<table className="table-fixed w-full">
							<thead>
								<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
									<th className="py-3 px-6 text-left w-1/3">Product</th>
									<th className="py-3 px-6 text-left">ASIN</th>
									<th className="py-3 px-6 text-left">Link</th>
									<th className="py-3 px-6 text-center">Price</th>
									<th className="py-3 px-6 text-center">Ratings</th>
									<th className="py-3 px-6 text-center w-32">Reviews</th>
								</tr>
							</thead>
							<tbody className="text-gray-600 text-sm font-light">
								{products.map((p, i) => (
									<tr key={i} className="border-b bg-gray-50 border-gray-200 hover:bg-gray-100">
										<td className="py-3 px-6 text-left flex">
											<div className="mr-2 w-6">
												<img className="w-20 rounded-full" alt="" src={p.thumbnail} />
											</div>
											<div className="flex-1">
												<Link to={`/products/${p.asin}`}>
													<span className="font-medium">{p.title}</span>
												</Link>
											</div>
										</td>
										<td className="py-3 px-6 text-left">
											<span>{p.asin}</span>
										</td>
										<td className="py-3 px-6 text-left break-all">
											<a className="text-blue-500" rel="noreferrer" target="_blank" href={p.url}>
												{p.url}
											</a>
										</td>
										<td className="py-3 px-6 text-center">
											<span>{p.price.current_price}</span>
										</td>
										<td className="py-3 px-6 text-center">
											<span>{p.reviews.rating}</span>
										</td>
										<td className="py-3 px-6 text-center">
											<Link to={`/products/${p.asin}`}>
												<span className="font-medium">{p.reviews.total_reviews} Reviews</span>
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};

export default Products;
