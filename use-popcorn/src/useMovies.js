import { useState, useEffect } from "react";

const KEY = "d1fd5334";

export function useMovies(query) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [movies, setMovies] = useState([]);

	useEffect(
		function () {
			const controller = new AbortController();
			async function fetchMovies() {
				try {
					setError("");
					setIsLoading(true);
					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
						{ signal: controller.signal }
					);
					if (!res.ok) throw new Error("Something went wrong!");
					const data = await res.json();

					if (!data.Search) throw new Error("No movies found");
					setMovies(data.Search);
					setError("");
					setIsLoading(false);
				} catch (err) {
					if (err.name !== "AbortError") setError(err.message);
				}
			}
			if (query.length < 3) {
				setMovies([]);
				setError("");
				return;
			}
			fetchMovies();

			return function () {
				controller.abort();
			};
		},
		[query]
	);

	return { movies, isLoading, error };
}
