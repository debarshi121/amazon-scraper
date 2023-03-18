import React, { useState, useEffect  } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

const ProductDetails = () => {
	const params = useParams()
	const [product, setProduct] = useState([]);
	const fetchProductByAsin = async () => {
		setProduct(null);
		try {
			const res = await axios.get(`http://127.0.0.1:3005/products/${params.asin}`);
			console.log(res.data)
			setProduct(res.data.result);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		fetchProductByAsin()
	}, []);
	return (
		<div className="bg-gray-100 min-h-screen">
			<div className="container mx-auto py-5">Test</div>
		</div>
	);
};

export default ProductDetails;
