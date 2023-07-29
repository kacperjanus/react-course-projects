function ProgressBar({ i, numQuestions, points, maxPoints, answer }) {
	return (
		<header className="progress">
			<progress max={numQuestions} value={i + Number(answer !== null)} />
			<p>
				Question <strong>{i + 1}</strong>/{numQuestions}
			</p>
			<p>
				<strong>{points}</strong>/{maxPoints}
			</p>
		</header>
	);
}

export default ProgressBar;
