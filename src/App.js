import React, { useState } from "react";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductContext } from "./contexts/ProductContext";
import { LoadingBarContext } from "./contexts/LoadingBarContext";
import LoadingBar from "react-top-loading-bar";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Products />,
	},
	{
		path: "products/:asin",
		element: <ProductDetails />,
	},
]);

const App = () => {
	const [progress, setProgress] = useState(0);
	const [products, setProducts] = useState([]);
	const [keyword, setKeyword] = useState("");
	return (
		<>
			<LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
			<ProductContext.Provider value={{ products, setProducts, keyword, setKeyword }}>
				<LoadingBarContext.Provider value={{ progress, setProgress }}>
                    <Navbar/>
					<RouterProvider router={router} />
				</LoadingBarContext.Provider>
			</ProductContext.Provider>
		</>
	);
};

export default App;
