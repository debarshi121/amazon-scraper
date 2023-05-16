import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ProductContext } from "../contexts/ProductContext";
import { LoadingBarContext } from "../contexts/LoadingBarContext";
import { ThreeDots } from "react-loader-spinner";

const Products = () => {
	const { products, setProducts, keyword, setKeyword } = useContext(ProductContext);
	const { setProgress } = useContext(LoadingBarContext);
	const [loading, setLoading] = useState(false);
	const fetchProducts = async () => {
		setLoading(true);
		setProgress(10);
		setProducts([]);
		setProgress(20);
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/products?keyword=${keyword}`);
			setProgress(70);
			setProducts(res.data.products.result);
			setProgress(100);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};
	return (
		<div className="bg-gray-100 min-h-screen px-3">
			<div className="container mx-auto py-5">
				<div className="flex flex-col md:flex-row gap-3">
					<div className="flex md:w-6/12 lg:w-3/12">
						<div className="px-2 py-2 border-l border-t border-b bg-slate-300">Keyword</div>
						<input className="border px-2 py-2 flex-1 focus:outline-none" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyPress={(e) => e.key === "Enter" && fetchProducts()} placeholder="Product name"></input>
					</div>
					<div className="flex justify-center">
						<button onClick={fetchProducts} className="border border-gray-500 px-2 py-2 rounded-sm bg-blue-100 font-medium">
							Get Products
						</button>
					</div>
				</div>
			</div>
			{products.length > 0 && !loading && (
				<div className="container mx-auto py-5">
					<div className="bg-white shadow-md rounded overflow-x-auto">
						<table className="table-auto w-full">
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
											<div className="mr-2 w-8">
												<img className="w-8 h-8 rounded-full" alt="" src={p.thumbnail} />
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
			{loading && (
				<div className="flex justify-center">
					<ThreeDots height="50" width="50" radius="9" color="#94a3b8" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} />
				</div>
			)}
		</div>
	);
};

export default Products;
