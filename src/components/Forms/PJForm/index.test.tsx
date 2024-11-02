import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MockPJForm from './renderTest';

describe('Component: PJForm', () => {
	it('should render the right inputs', () => {
		render(<MockPJForm onSubmit={jest.fn} />);
		screen.getByLabelText('Nome Fantasia');
		screen.getByLabelText('Razão Social');
		screen.getByLabelText('CNPJ');
	});

	it('render errors when have errors', async () => {
		render(<MockPJForm onSubmit={jest.fn} />);
		const cnpjInput = screen.getByLabelText('CNPJ');
		const submitButton = screen.getByRole('button', { name: 'Submit' });

		await userEvent.type(cnpjInput, '123');

		await userEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getAllByText('*Required').length).toBe(2);
			screen.getByText('*CNPJ inválido');
		});
	});

	it('should work the right mask for cnpj', async () => {
		render(<MockPJForm onSubmit={jest.fn} />);

		const cnpjInput = screen.getByLabelText('CNPJ');

		await userEvent.type(cnpjInput, '12345678912345');
		expect(cnpjInput).toHaveValue('12.345.678/9123-45');
	});
});
