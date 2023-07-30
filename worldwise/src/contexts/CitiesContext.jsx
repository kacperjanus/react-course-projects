import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
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
		<CitiesContext.Provider value={{ cities, isLoading }}>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw new Error("Trying to access context outside of a provider");
	return context;
}

export { CitiesProvider, useCities };
