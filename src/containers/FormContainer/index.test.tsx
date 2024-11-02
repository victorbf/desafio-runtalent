import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MockFormContainer from './renderTest';

describe('Container: FormContainer', () => {
	it('should render PFform when isPF is true', () => {
		render(<MockFormContainer onSubmit={jest.fn} isPF />);
		screen.getByText('Form Container');
		screen.getByLabelText('Nome');
		screen.getByLabelText('CPF');

		const fantasyNameInput = screen.queryByLabelText('Nome Fantasia');
		const socialInput = screen.queryByLabelText('Razão Social');
		const cnpjInput = screen.queryByLabelText('CNPJ');

		expect(fantasyNameInput).not.toBeInTheDocument();
		expect(socialInput).not.toBeInTheDocument();
		expect(cnpjInput).not.toBeInTheDocument();
	});

	it('should render PJform when isPF is false', async () => {
		render(<MockFormContainer onSubmit={jest.fn} isPF={false} />);
		screen.getByLabelText('Nome Fantasia');
		screen.getByLabelText('Razão Social');
		screen.getByLabelText('CNPJ');

		const nameInput = screen.queryByLabelText('Nome');
		const cpfInput = screen.queryByLabelText('CPF');

		expect(nameInput).not.toBeInTheDocument();
		expect(cpfInput).not.toBeInTheDocument();
	});

	it('should go back on click in arrowback icon', async () => {
		render(<MockFormContainer onSubmit={jest.fn} isPF={false} />);

		const backButton = screen.getByRole('button', { name: 'Voltar' });

		await userEvent.click(backButton);

		await waitFor(() => {
			expect(window.location.pathname).toBe('/');
		});
	});
});
