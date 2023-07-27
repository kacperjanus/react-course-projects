import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";

const initialState = {
	questions: [],
	//loading, error, ready, active, finished
	status: "loading",
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			return { ...state, status: "active" };
		default:
			throw new Error("Action unknown");
	}
}

export default function App() {
	const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

	const numQuestions = questions.length;

	useEffect(function () {
		fetch("http://localhost:8000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			.catch((err) => dispatch({ type: "dataFailed" }));
	}, []);

	function handleStart() {
		dispatch({ type: "start" });
	}

	return (
		<div className="app">
			<Header />

			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen
						numQuestions={numQuestions}
						onStart={handleStart}
					/>
				)}
				{status === "active" && <Question />}
			</Main>
		</div>
	);
}