import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import parse from 'html-react-parser';
import { Answer } from '../interfaces/Answer';
import { v4 } from 'uuid';
import shuffleAnswers from '../utils/shuffleAnswers';

interface Props {
	question: string;
	answers: string[];
	userAnswer: Answer;
	questionNum: number;
	totalQuestions: number;
	score: number;
	checkAnswer(e: React.MouseEvent<HTMLButtonElement>): void;
	nextQuestion(): void;
}

const QuestionCard = ({
	answers,
	checkAnswer,
	question,
	userAnswer,
	questionNum,
	totalQuestions,
	nextQuestion,
	score
}: Props) => {
	const [shuffled, setShuffled] = useState<string[]>([]);

	useEffect(() => {
		setShuffled(shuffleAnswers(answers));
	}, [question]);

	return (
		<div className='my-2 w-100'>
			<h3 className='font-weight-bold mb-4 text-center'>
				Score: <span className='text-primary font-weight-bolder'>{score}</span>
			</h3>

			<h5 className='mb-4'>{parse(question)}</h5>

			{shuffled.map((answer) => (
				<Card key={v4()}>
					<Button
						disabled={Boolean(userAnswer)}
						variant={
							userAnswer?.correctAnswer === answer
								? 'success'
								: userAnswer?.isCorrect === false &&
								  userAnswer?.answer === answer
								? 'danger'
								: 'primary'
						}
						onClick={checkAnswer}
						value={answer}
					>
						{parse(answer)}
					</Button>
				</Card>
			))}

			<div className='my-2 text-center'>
				<p>
					<span className='font-weight-bold text-info'>{questionNum}</span> /{' '}
					<span className='font-weight-bold'>{totalQuestions}</span>
				</p>
			</div>

			<Button
				onClick={nextQuestion}
				disabled={Boolean(userAnswer === undefined)}
				size='lg'
				block
			>
				Next
			</Button>
		</div>
	);
};

export default QuestionCard;
