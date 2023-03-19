import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const Reviews = () => {
	const params = useParams();
	const [loading, setLoading] = useState(true);
	const [reviews, setReviews] = useState([]);
	const [starsStat, setStarsStat] = useState(null);

	const [totalRatings, setTotalRatings] = useState(0);
	const fetchReviewsByAsin = async () => {
		setReviews([]);
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/products/${params.asin}/reviews`);
			setReviews(res.data.result);
			setTotalRatings(res.data.total_reviews);
			setStarsStat(res.data.stars_stat);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	const calculateOverallRating = (starsStat) => {
		let rating = 0;
		Object.keys(starsStat).forEach((star) => {
			rating = rating + star * starsStat[star].slice(0, -1);
		});
		return rating / 100;
	};
	useEffect(() => {
		fetchReviewsByAsin();
	}, []);
	if (!loading) {
		return (
			<div className="bg-white container mx-auto px-10 py-10">
				<div className="text-lg font-medium">
					<p>Total Ratings: {totalRatings}</p>
					<p>Overall Ratings: {calculateOverallRating(starsStat)} out of 5</p>
				</div>
				{starsStat && (
					<div className="text-sm mt-3">
						{Object.keys(starsStat)
							.reverse()
							.map((key, i) => {
								return (
									<div key={`rating-${i}`} className="flex items-center gap-3">
										<span>{key} star</span>
										<div className="h-2 relative w-40 rounded mt-0.5 overflow-hidden">
											<div className="w-full h-full bg-gray-200 absolute"></div>
											<div className="h-full bg-yellow-400 absolute" style={{ width: starsStat[key] }}></div>
										</div>
										<span>{starsStat[key]}</span>
									</div>
								);
							})}
					</div>
				)}

				{reviews.length > 0 ? (
					<div className="divide-y divide-slate-300">
						{reviews.map((r, i) => {
							return (
								<div key={`r-${i}`} className="py-4">
									<div className="flex gap-2 items-center">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
											<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>

										<span>{r.name}</span>
									</div>
									<div className="flex gap-3 items-center">
										<div className="flex">
											{[...Array(5)].map((e, i) => {
												return (
													<svg key={`star-${i}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className={`w-4 h-4 stroke-yellow-600 ${i <= r.rating && "fill-yellow-600"}`}>
														<path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
													</svg>
												);
											})}
										</div>

										<span className="font-medium">{r.title}</span>
									</div>
									<p className="text-gray-500 text-sm">{r.review_data}</p>
									{r.verified_purchase === true && <p className="text-xs font-medium text-orange-700">Verified Purchase</p>}
									<p className="mt-2 text-gray-700">{r.review}</p>
								</div>
							);
						})}
					</div>
				) : (
					<div className="text-lg text-gray-300 font-medium">
						<p>No Reviews Yet!</p>
					</div>
				)}
			</div>
		);
	} else {
		return (
			<div className="bg-white container mx-auto px-10 py-10 flex justify-center">
				<ThreeDots height="50" width="50" radius="9" color="#94a3b8" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} />
			</div>
		);
	}
};

export default Reviews;
