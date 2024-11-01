import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import ClientList from '.';
import { render, screen, waitFor } from '@testing-library/react';
import { mockClientPF, mockClientPJ } from '../../tests_mocks';
import { server } from '../../mocks/serverTest';
import {
	emptyHandler,
	errorFetchHandler,
	errorDeleteHandler,
} from '../../mocks/handlers/testHandlers';
import userEvent from '@testing-library/user-event';

const renderClientList = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});
	render(
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ClientList />
			</BrowserRouter>
		</QueryClientProvider>
	);
};

describe('Page: ClientList', () => {
	describe('Fetch: List', () => {
		it('should render loading and client list', async () => {
			renderClientList();
			screen.getByText('Loading...');

			await waitFor(() => {
				screen.getByText(mockClientPF.name);
				screen.getByText(mockClientPJ.name_fantasy);
			});
		});

		it('should render error when fetch fails', async () => {
			server.use(...errorFetchHandler);
			renderClientList();

			await waitFor(() => {
				screen.getByText('Ocorreu um erro ao carregar clientes.');
			});
		});

		it('should render empty state when response is empty', async () => {
			server.use(...emptyHandler);
			renderClientList();

			await waitFor(() => {
				screen.getByText('Nenhum cliente... crie novos!');
			});
		});
	});
	describe('Fetch: Delete', () => {
		it('should delete client as sucess', async () => {
			renderClientList();

			await waitFor(() => {
				screen.getByText(mockClientPF.name);
			});

			const deleteButton = screen.getAllByRole('button', { name: 'Deletar' });
			await userEvent.click(deleteButton[0]);

			await waitFor(async () => {
				const confirmButton = screen.getByText('CONFIRMAR');
				await userEvent.click(confirmButton);
			});

			await waitFor(() => {
				screen.getByText('Cliente removido com sucesso!');
			});
		});
		it('should delete client as error', async () => {
			server.use(...errorDeleteHandler);
			renderClientList();

			await waitFor(() => {
				screen.getByText(mockClientPF.name);
			});

			const deleteButton = screen.getAllByRole('button', { name: 'Deletar' });
			await userEvent.click(deleteButton[0]);

			await waitFor(async () => {
				const confirmButton = screen.getByText('CONFIRMAR');
				await userEvent.click(confirmButton);
			});

			await waitFor(() => {
				screen.getByText('Ocorreu um erro ao remover cliente.');
			});
		});
	});
	describe('Actions', () => {
		it('should call right url when click on add', async () => {
			renderClientList();

			const addButton = screen.getByRole('button', {
				name: 'Adicionar cliente',
			});

			await userEvent.click(addButton);

			expect(window.location.pathname).toBe('/clients/new');
		});
	});
});
