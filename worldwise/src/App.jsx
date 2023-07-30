import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import "./index.css";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();

				setCities(data);
			} catch {
				alert("Something went wrong!");
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="app" element={<AppLayout />}>
					<Route
						index
						element={
							<CityList cities={cities} isLoading={isLoading} />
						}
					/>
					<Route
						path="cities"
						element={
							<CityList cities={cities} isLoading={isLoading} />
						}
					/>
					<Route
						path="countries"
						element={<p>List of countries</p>}
					/>
					<Route path="form" element={<p>Form</p>} />
				</Route>
				<Route path="login" element={<Login />} />
				<Route path="/" element={<Homepage />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
