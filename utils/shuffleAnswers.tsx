const shuffleAnswers = (answers: string[]) => {
	return [...answers].sort(() => Math.random() - 0.5);
};

export default shuffleAnswers;
