import React from 'react';
import { Answer } from '../interfaces/Answer';
import { Card, Accordion, Button } from 'react-bootstrap';
import { X, Check } from 'react-bootstrap-icons';
import parse from 'html-react-parser';
import { v4 } from 'uuid';

interface Props {
	score: number;
	userAnswers: Answer[];
	totalQuestions: number;
}

const Review = ({ score, userAnswers, totalQuestions }: Props) => {
	return (
		<div className='d-block w-100'>
			<h5 className='text-center'>
				Out of <span className='text-primary'>{totalQuestions}</span> , you've
				got
			</h5>

			{score < 0.5 * totalQuestions ? (
				<h1 className='my-2 text-danger text-center'>{score}</h1>
			) : score < 0.75 * totalQuestions ? (
				<h1 className='my-2 text-warning text-center'>{score}</h1>
			) : (
				<h1 className='my-2 text-success text-center'>{score}</h1>
			)}

			{userAnswers.map((userAnswer, index) => (
				<Accordion key={v4()}>
					<Card
						className='my-2'
						bg={userAnswer.isCorrect ? 'success' : 'danger'}
						text='white'
					>
						<Accordion.Toggle
							className='d-flex justify-content-between align-items-center'
							as={Card.Header}
							eventKey='0'
						>
							<div>Question {index}</div>
							{userAnswer.isCorrect ? <Check /> : <X />}
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='0'>
							<Card.Body>
								<Card.Title>{parse(userAnswer.question)}</Card.Title>
								<Card.Text className='mb-0'>
									Correct answer:{' '}
									<span className='font-weight-bold'>
										{parse(userAnswer.correctAnswer)}
									</span>
								</Card.Text>
								<Card.Text>
									Your answer:{' '}
									<span className='font-weight-bold'>
										{parse(userAnswer.answer)}
									</span>
								</Card.Text>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			))}
		</div>
	);
};

export default Review;
