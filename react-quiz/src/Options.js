function Options({ question, dispatch, answer }) {
	const haveAnswered = answer !== null;
	return (
		<div className="options">
			{question.options.map((option, i) => (
				<button
					className={`btn btn-option ${
						i === answer ? "answer" : ""
					} ${
						haveAnswered
							? i === question.correctOption
								? "correct"
								: "wrong"
							: ""
					}`}
					key={option}
					disabled={haveAnswered}
					onClick={() => dispatch({ type: "newAnswer", payload: i })}
				>
					{option}
				</button>
			))}
		</div>
	);
}

export default Options;