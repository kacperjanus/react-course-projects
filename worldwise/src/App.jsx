import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

import "./index.css";

function App() {
	return (
		<CitiesProvider>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="product" element={<Product />} />
						<Route path="pricing" element={<Pricing />} />
						<Route path="app" element={<AppLayout />}>
							<Route
								index
								element={<Navigate replace to="cities" />}
							/>
							<Route path="cities" element={<CityList />} />
							<Route path="cities/:id" element={<City />} />
							<Route path="countries" element={<CountryList />} />
							<Route path="form" element={<Form />} />
						</Route>
						<Route path="login" element={<Login />} />
						<Route path="/" element={<Homepage />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</CitiesProvider>
	);
}

export default App;
