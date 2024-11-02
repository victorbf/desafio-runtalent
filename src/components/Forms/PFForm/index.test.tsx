import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MockPFForm from './renderTest';

describe('Component: PFForm', () => {
	it('should render the right inputs', () => {
		render(<MockPFForm onSubmit={jest.fn} />);
		screen.getByLabelText('Nome');
		screen.getByLabelText('CPF');
	});

	it('render errors when have errors', async () => {
		render(<MockPFForm onSubmit={jest.fn} />);
		const cpfInput = screen.getByLabelText('CPF');
		const submitButton = screen.getByRole('button', { name: 'Submit' });

		await userEvent.type(cpfInput, '321');

		await userEvent.click(submitButton);

		await waitFor(() => {
			screen.getByText('*Required');
			screen.getByText('*CPF inválido');
		});
	});

	it('should work the right mask for cpf', async () => {
		render(<MockPFForm onSubmit={jest.fn} />);

		const cpfInput = screen.getByLabelText('CPF');

		await userEvent.type(cpfInput, '12345678910');
		expect(cpfInput).toHaveValue('123.456.789-10');
	});
});
