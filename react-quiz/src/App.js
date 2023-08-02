import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton from "./NextButton.js";
import ProgressBar from "./ProgressBar.js";
import FinishScreen from "./FinishScreen.js";
import Timer from "./Timer.js";
import Footer from "./Footer.js";
import { useQuiz } from "./QuizContext.js";

export default function App() {
	const { status } = useQuiz();

	return (
		<div className="app">
			<Header />

			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && <StartScreen />}
				{status === "active" && (
					<>
						<ProgressBar />
						<Question />
						<Footer>
							<NextButton />
							<Timer />
						</Footer>
					</>
				)}
				{status === "finished" && <FinishScreen />}
			</Main>
		</div>
	);
}
