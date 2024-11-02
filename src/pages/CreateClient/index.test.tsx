import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateClient from './';
import { server } from '../../mocks/serverTest';
import '@testing-library/jest-dom';
import { errorFetchHandler } from '../../mocks/handlers/testHandlers';
import userEvent from '@testing-library/user-event';

describe('Page: CreateClient', () => {
	describe('Api calls', () => {
		it('should change go to /clients when create is success', async () => {
			render(
				<BrowserRouter>
					<CreateClient />
				</BrowserRouter>
			);
			const emailInput = screen.getByLabelText('Email');
			const phoneInput = screen.getByLabelText('Celular');
			const cpfInput = screen.getByLabelText('CPF');
			const nameInput = screen.getByLabelText('Nome');
			await userEvent.type(emailInput, 'ben@jedi.com');
			await userEvent.type(phoneInput, '(11) 91234-5678');
			await userEvent.type(cpfInput, '123.456.789-12');
			await userEvent.type(nameInput, 'Obi-wan Kenobi');

			await userEvent.click(
				screen.getByRole('button', { name: 'Criar cliente' })
			);

			await waitFor(() => {
				expect(window.location.pathname).toBe('/clients');
			});
		});
		it('should show error message when create return error', async () => {
			server.use(...errorFetchHandler);
			render(
				<BrowserRouter>
					<CreateClient />
				</BrowserRouter>
			);

			const emailInput = screen.getByLabelText('Email');
			const phoneInput = screen.getByLabelText('Celular');
			const cpfInput = screen.getByLabelText('CPF');
			const nameInput = screen.getByLabelText('Nome');
			await userEvent.type(emailInput, 'ben@jedi.com');
			await userEvent.type(phoneInput, '(11) 91234-5678');
			await userEvent.type(cpfInput, '123.456.789-12');
			await userEvent.type(nameInput, 'Obi-wan Kenobi');

			await userEvent.click(
				screen.getByRole('button', { name: 'Criar cliente' })
			);

			await waitFor(() => {
				screen.getByText('Ocorreu um erro ao criar cliente!');
			});
		});
	});
	describe('Component behavior', () => {
		it('should render PF as default', () => {
			render(
				<BrowserRouter>
					<CreateClient />
				</BrowserRouter>
			);

			screen.getByLabelText('CPF');
			const cnpjInput = screen.queryByLabelText('CNPJ');

			expect(cnpjInput).not.toBeInTheDocument();
		});

		it('should change form when change PJ', async () => {
			render(
				<BrowserRouter>
					<CreateClient />
				</BrowserRouter>
			);

			const fantasyNameInput = screen.queryByLabelText('Nome Fantasia');
			const socialInput = screen.queryByLabelText('Razão Social');
			const cnpjInput = screen.queryByLabelText('CNPJ');
			screen.getByLabelText('Nome');
			screen.getByLabelText('CPF');

			expect(fantasyNameInput).not.toBeInTheDocument();
			expect(socialInput).not.toBeInTheDocument();
			expect(cnpjInput).not.toBeInTheDocument();

			const typeInput = screen.getByText('Pessoa Física (PF)');
			await userEvent.click(typeInput);

			const pjOption = screen.getByText('Pessoa Juridíca (PJ)');
			await userEvent.click(pjOption);

			const nameInput = screen.queryByLabelText('Nome');
			const cpfInput = screen.queryByLabelText('CPF');

			screen.getByLabelText('Nome Fantasia');
			screen.getByLabelText('Razão Social');
			screen.getByLabelText('CNPJ');
			expect(nameInput).not.toBeInTheDocument();
			expect(cpfInput).not.toBeInTheDocument();
		});
	});
});
