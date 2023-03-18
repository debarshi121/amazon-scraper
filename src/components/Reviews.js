import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

const Reviews = () => {
    const params = useParams()
	const [reviews, setReviews] = useState([]);
	const fetchReviewsByAsin = async () => {
		setReviews([]);
		try {
			const res = await axios.get(`http://127.0.0.1:3005/products/${params.asin}/reviews`);
			console.log(res.data);
			setReviews(res.data.result);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchReviewsByAsin();
	}, []);

	if(reviews.length > 0){
		return (
			<div className="bg-gray-100 min-h-screen">
				<div className="container mx-auto py-5">{reviews[0].id}</div>
			</div>
		);
	}
};

export default Reviews;
