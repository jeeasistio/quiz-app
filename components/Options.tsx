import React from 'react';
import { Form, Col } from 'react-bootstrap';

interface Props {
	changeDiff(e: React.ChangeEvent<HTMLInputElement>): void;
	changeAmount(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Options = ({ changeAmount, changeDiff }: Props) => {
	return (
		<div className='w-100 my-2'>
			<Form>
				<Form.Row>
					<Col>
						<Form.Control as='select' onChange={changeDiff}>
							<option value='easy'>Easy</option>
							<option value='medium'>Medium</option>
							<option value='hard'>Hard</option>
						</Form.Control>
					</Col>
					<Col>
						<Form.Control as='select' onChange={changeAmount}>
							<option value='10'>10</option>
							<option value='20'>20</option>
							<option value='30'>30</option>
						</Form.Control>
					</Col>
				</Form.Row>
			</Form>
		</div>
	);
};

export default Options;
