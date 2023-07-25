import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "d1fd5334";

export default function App() {
	const [movies, setMovies] = useState([]);
	// const [watched, setWatched] = useState([]);
	const [watched, setWatched] = useState(() =>
		JSON.parse(localStorage.getItem("watched"))
	);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState(null);

	function handleSelectMovie(movieId) {
		setSelectedId((selectedId) =>
			selectedId === movieId ? null : movieId
		);
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddWatchedMovie(movie) {
		setWatched([...watched, movie]);
		setSelectedId(null);
	}

	function handleDeleteWatched(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}

	useEffect(
		function () {
			localStorage.setItem("watched", JSON.stringify(watched));
		},
		[watched]
	);

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

			handleCloseMovie();
			fetchMovies();

			return function () {
				controller.abort();
			};
		},
		[query]
	);

	return (
		<>
			<Navbar>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<Numresults movies={movies} />
			</Navbar>
			<Main>
				<Box>
					{isLoading && !error && <Loader />}
					{!isLoading && !error && (
						<MovieList
							movies={movies}
							onSelectMovie={handleSelectMovie}
						/>
					)}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetail
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleAddWatchedMovie}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovieList
								watched={watched}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function Loader() {
	return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
	return (
		<p className="error">
			<span>🚫</span> {message}
		</p>
	);
}

function Navbar({ children }) {
	return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
	return (
		<div className="logo">
			<span role="img">🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function Numresults({ movies }) {
	return (
		<p className="num-results">
			Found <strong>{movies.length}</strong> results
		</p>
	);
}

function Search({ query, setQuery }) {
	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	);
}

function Main({ children }) {
	return <main className="main">{children}</main>;
}

function WatchedMovieList({ watched, onDeleteWatched }) {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovie
					movie={movie}
					key={movie.imdbID}
					onDeleteWatched={onDeleteWatched}
				/>
			))}
		</ul>
	);
}

function WatchedMovie({ movie, onDeleteWatched }) {
	return (
		<li>
			<img src={movie.poster} alt={`${movie.title} poster`} />
			<h3>{movie.title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
				<button
					className="btn-delete"
					onClick={() => onDeleteWatched(movie.imdbID)}
				></button>
			</div>
		</li>
	);
}

function MovieDetail({ selectedId, onCloseMovie, onAddWatched, watched }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [uRating, setURating] = useState(0);

	const alreadyRated = watched.find((mov) => mov.imdbID === movie.imdbID);

	//if (movie) {
	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;
	//}

	function handleAdd() {
		if (uRating === 0) return;
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: runtime.split(" ").at(0),
			userRating: uRating,
		};
		onAddWatched(newWatchedMovie);
	}

	useEffect(
		function () {
			async function getMovieDetails() {
				try {
					setIsLoading(true);
					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
					);
					if (!res.ok) throw new Error("Unable to fetch the movie");
					const data = await res.json();
					setMovie(data);
					setIsLoading(false);
				} catch (err) {
					console.error(err.message);
				}
			}
			getMovieDetails();
		},
		[selectedId]
	);

	useEffect(
		function () {
			if (!title) return;
			document.title = `Movie | ${title}`;

			return function () {
				document.title = "usePopcorn";
			};
		},
		[title]
	);

	useEffect(
		function () {
			function esc(e) {
				if (e.code === "Escape") {
					onCloseMovie();
				}
			}
			document.addEventListener("keydown", esc);

			return function () {
				document.removeEventListener("keydown", esc);
			};
		},
		[onCloseMovie]
	);

	return (
		<div className="details">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className="btn-back" onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${title} movie`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐️</span>
								{imdbRating} IMBdRating
							</p>
						</div>
					</header>

					<section>
						<div className="rating">
							{alreadyRated ? (
								<>
									<StarRating
										maxRating={10}
										size={25}
										onSetRating={setURating}
										defaultRating={alreadyRated.userRating}
										blocked={true}
									/>
									<p>You already rated this movie</p>
								</>
							) : (
								<StarRating
									maxRating={10}
									size={25}
									onSetRating={setURating}
								/>
							)}
							{uRating > 0 && !alreadyRated && (
								<button className="btn-add" onClick={handleAdd}>
									Add movie
								</button>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
}

function WatchedSummary({ watched }) {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));
	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating.toFixed(2)}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating.toFixed(2)}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime.toFixed(2)} min</span>
				</p>
			</div>
		</div>
	);
}

function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<div className="box">
			<button
				className="btn-toggle"
				onClick={() => setIsOpen((open) => !open)}
			>
				{isOpen ? "–" : "+"}
			</button>
			{isOpen && children}
		</div>
	);
}

function MovieList({ movies, onSelectMovie }) {
	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<Movie
					movie={movie}
					key={movie.imdbID}
					onSelectMovie={onSelectMovie}
				/>
			))}
		</ul>
	);
}

function Movie({ movie, onSelectMovie }) {
	return (
		<li onClick={() => onSelectMovie(movie.imdbID)}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}
