import Head from 'next/head';
import QuestionCard from '../components/QuestionCard';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Question, Difficulty } from '../interfaces/Question';
import { Container, Button } from 'react-bootstrap';
import { Answer } from '../interfaces/Answer';
import Review from '../components/Review';
import Options from '../components/Options';

interface ApiKeys {
	amount: number;
	difficulty: Difficulty;
}

interface Props {}

const fetchQuestions = async (
	key: string,
	{ amount, difficulty }: ApiKeys
): Promise<Question[]> => {
	const res = await axios.get(
		`https://opentdb.com/api.php?amount=${amount}&category=31&difficulty=${difficulty}&type=multiple`
	);
	return res.data.results;
};

const index = (props: Props) => {
	const [amount, setAmount] = useState(10);
	const [difficulty, setDifficulty] = useState<Difficulty>('easy');
	const [questionNum, setQuestionNum] = useState(0);
	const [over, setOver] = useState(true);
	const [review, setReview] = useState(false);
	const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
	const [score, setScore] = useState(0);
	const { data: questions, status, refetch } = useQuery(
		['questions', { amount, difficulty }],
		fetchQuestions,
		{ enabled: false }
	);

	const startQuiz = () => {
		setOver(false);
		setReview(false);
		setScore(0);
		setQuestionNum(0);
		setUserAnswers([]);
		refetch();
	};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (questions) {
			const currQuestion = questions[questionNum];
			const answer = e.currentTarget.value;
			const correctAnswer = currQuestion.correct_answer;
			const isCorrect = answer === correctAnswer;

			if (isCorrect) setScore((prev) => prev + 1);

			const newAnswer = {
				question: currQuestion.question,
				answer,
				correctAnswer,
				isCorrect
			};
			setUserAnswers((prev) => [...prev, newAnswer]);
		}
	};

	const nextQuestion = () => {
		const nextQuestion = questionNum + 1;

		if (nextQuestion === questions?.length) {
			setOver(true);
			setReview(true);
		} else {
			setQuestionNum(nextQuestion);
		}
	};

	const changeDiff = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDifficulty(e.currentTarget.value as Difficulty);
	};

	const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(Number(e.currentTarget.value));
	};

	return (
		<div>
			<Head>
				<title>Quiz App</title>
			</Head>

			<Container className='min-vh-100 d-flex flex-column justify-content-center align-items-center my-2'>
				<h1 className='m-0'>Anime Quiz</h1>
				<p className='text-secondary'>
					Test your knowledge about the world of anime.
				</p>

				{status === 'loading' && (
					<h4>Thinking some questions. Please wait...</h4>
				)}

				{over !== true && questions && status !== 'loading' && (
					<QuestionCard
						answers={[
							...questions[questionNum].incorrect_answers,
							questions[questionNum].correct_answer
						]}
						question={questions[questionNum].question}
						userAnswer={userAnswers[questionNum]}
						questionNum={questionNum + 1}
						totalQuestions={questions.length}
						checkAnswer={checkAnswer}
						nextQuestion={nextQuestion}
						score={score}
					/>
				)}

				{review && (
					<Review
						score={score}
						userAnswers={userAnswers}
						totalQuestions={questions?.length}
					/>
				)}

				{over === true && (
					<Options changeAmount={changeAmount} changeDiff={changeDiff} />
				)}

				{over === true && (
					<Button className='my-2' onClick={startQuiz} size='lg' block>
						{review ? 'Play Again' : 'Start Quiz'}
					</Button>
				)}
			</Container>
		</div>
	);
};

export default index;
