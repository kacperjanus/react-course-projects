import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import "./index.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="app" element={<AppLayout />}>
					<Route index element={<p>LIST</p>} />
					<Route path="cities" element={<p>List of cities</p>} />
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
