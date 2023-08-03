import {
	createContext,
	useState,
	useEffect,
	useContext,
	useReducer,
	useCallback,
} from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };
		case "cities/loaded":
			return { ...state, isLoading: false, cities: action.payload };
		case "cities/created":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};
		case "cities/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter(
					(city) => city.id !== action.payload
				),
				currentCity: {},
			};
		case "cities/newCurCity":
			return { ...state, currentCity: action.payload, isLoading: false };
		case "rejected":
			return { ...state, isLoading: false, error: action.payload };
		default:
			throw new Error("Unknown action type");
	}
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(function () {
		async function fetchCities() {
			try {
				dispatch({ type: "loading" });
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();

				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({
					type: "rejected",
					paylaod: "There was an error fetching cities!",
				});
			}
		}
		fetchCities();
	}, []);

	const getCity = useCallback(
		async function getCity(id) {
			if (Number(id) === currentCity.id) return;
			try {
				dispatch({ type: "loading" });
				const res = await fetch(`${BASE_URL}/cities/${id}`);
				const data = await res.json();

				dispatch({ type: "cities/newCurCity", payload: data });
			} catch {
				dispatch({
					type: "rejected",
					payload: "There was an error fetching single city data!",
				});
			}
		},
		[currentCity.id]
	);

	async function createCity(newCity) {
		try {
			dispatch({ type: "loading" });
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			dispatch({ type: "cities/created", payload: data });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error while creating new city!",
			});
		}
	}

	async function deleteCity(id) {
		try {
			dispatch({ type: "loading" });
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});

			dispatch({ type: "cities/deleted", payload: id });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error while deleting a city!",
			});
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				createCity,
				deleteCity,
			}}
		>
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
