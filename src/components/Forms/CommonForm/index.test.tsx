import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MockCommonForm from './renderTest';

describe('Component: CommonForm', () => {
	it('should render the right inputs', () => {
		render(<MockCommonForm onSubmit={jest.fn} />);
		screen.getByLabelText('Email');
		screen.getByLabelText('Celular');
	});

	it('render errors when have errors', async () => {
		render(<MockCommonForm onSubmit={jest.fn} />);
		const emailInput = screen.getByLabelText('Email');
		const phoneInput = screen.getByLabelText('Celular');
		const submitButton = screen.getByRole('button', { name: 'Submit' });

		await userEvent.type(emailInput, 'email not valid');
		await userEvent.type(phoneInput, '(31) 88888');

		await userEvent.click(submitButton);

		await waitFor(() => {
			screen.getByText('*Email inválido');
			screen.getByText('*Telefone deve ter o formato (DD) 9XXXX-XXXX');
		});
	});

	it('should work the right mask for phone', async () => {
		render(<MockCommonForm onSubmit={jest.fn} />);

		const phoneInput = screen.getByLabelText('Celular');

		await userEvent.type(phoneInput, '11912345678');
		expect(phoneInput).toHaveValue('(11) 91234-5678');
	});
});
