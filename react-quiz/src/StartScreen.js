import { useState } from "react";

function StartScreen({ numQuestions, dispatch }) {
	const [selectedNumQuestions, setSelectedNumQuestions] =
		useState(numQuestions);
	return (
		<div className="start">
			<h2>Welcome to the React Quiz</h2>
			<h3>
				<input
					className="question-input"
					value={selectedNumQuestions}
					onChange={(e) =>
						setSelectedNumQuestions(
							Number(e.target.value)
								? Number(e.target.value) > 15
									? 15
									: Number(e.target.value)
								: 0
						)
					}
					size={3}
				></input>
				questions to test your React mastery
			</h3>
			<button
				className=" btn btn-ui"
				onClick={() => {
					if (!selectedNumQuestions) return;
					dispatch({ type: "start", payload: selectedNumQuestions });
				}}
			>
				Let's start
			</button>
		</div>
	);
}

export default StartScreen;
