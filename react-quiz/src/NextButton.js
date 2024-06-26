import { useQuiz } from "./QuizContext";

function NextButton() {
	const { dispatch, answer, index, questions } = useQuiz();

	if (answer === null) return null;

	return (
		<button
			className="btn btn-ui"
			onClick={
				index === questions.length - 1
					? () => dispatch({ type: "finished" })
					: () => dispatch({ type: "nextQuestion" })
			}
		>
			{index === questions.length - 1 ? "Finish" : "Next"}
		</button>
	);
}

export default NextButton;
