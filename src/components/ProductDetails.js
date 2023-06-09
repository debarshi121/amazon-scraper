import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import Reviews from "./Reviews";
import { LoadingBarContext } from "../contexts/LoadingBarContext";

const ProductDetails = () => {
	const { progress, setProgress } = useContext(LoadingBarContext);
	const params = useParams();
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState(null);
	const [activeImage, setActiveImage] = useState(null);
	const fetchProductByAsin = async () => {
		setProgress(10);
		setLoading(true);
		setProduct(null);
		try {
			setProgress(20);
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/products/${params.asin}`);
			setProgress(70);
			setProduct(res.data.result[0]);
			setActiveImage(res.data.result[0].main_image);
			setLoading(false);
			setProgress(100);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchProductByAsin();
	}, []);
	if (loading) {
		return (
			<LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
		)
	} else if (!loading && product) {
		return (
			<div className="bg-gray-100 min-h-screen py-10">
				<div className="container bg-white mx-auto px-10 py-10 gap-5 grid grid-cols-1 md:grid-cols-2">
					<div className="flex gap-5 items-center">
						<div className="w-16 gap-1 flex flex-col">
							{product.images.slice(0, 6).map((i, j) => {
								return (
									<div key={`j-${j}`} onClick={() => setActiveImage(i)} className="border w-16 h-16 flex items-center justify-center hover:cursor-pointer">
										<img alt={i} className="w-full" src={i} />
									</div>
								);
							})}
						</div>
						<div className="flex-1 flex items-center justify-center">
							<img className="w-full" alt={product.title} src={activeImage} />
						</div>
					</div>
					<div>
						<p className="text-xl font-semibold">{product.title}</p>
						<p className="text-sm font-medium mt-3">{product.product_information.brand}</p>
						<p className="mt-3">{product.description}</p>
						<p className="mt-3 font-semibold">
							Price: <span className="text-xl">{product.price.symbol + product.price.current_price}</span>
						</p>
						<p className="mt-3">Total Reviews: {product.reviews.total_reviews}</p>
						{product.reviews.rating && <p>Rating: {product.reviews.rating}</p>}
						<p className="font-medium mt-3">About This Item:</p>
						<ul className="list-disc list-inside">
							{product.feature_bullets.map((b, i) => {
								return <li className="text-sm" key={`b-${i}`}>{b}</li>;
							})}
						</ul>
						<p className="mt-5">ASIN: {product.asin}</p>
						<p>
							URL:{" "}
							<a className="text-blue-500 text-ellipsis" href={product.url} target="_blank" rel="noreferrer">
								{product.url}
							</a>
						</p>
					</div>
				</div>
				<Reviews/>
			</div>
		);
	} else {
		return <div>Data not available!</div>;
	}
};

export default ProductDetails;
