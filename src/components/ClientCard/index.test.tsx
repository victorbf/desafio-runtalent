import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ClientCard from './';
import { mockClientPF, mockClientPJ } from '../../tests_mocks';

describe('Component: ClientCard', () => {
	it('should render PF fields if type is PF', () => {
		render(
			<ClientCard client={mockClientPF} onConfirm={jest.fn} onEdit={jest.fn} />
		);
		const cnpj = screen.queryByText(mockClientPJ['cnpj']);
		const fantasyName = screen.queryByText(mockClientPJ['name_fantasy']);
		const corporateName = screen.queryByText(mockClientPJ['corporate_name']);

		expect(cnpj).not.toBeInTheDocument();
		expect(fantasyName).not.toBeInTheDocument();
		expect(corporateName).not.toBeInTheDocument();

		screen.getByText(mockClientPF['cpf']);
		screen.getByText(mockClientPF['name']);
	});
	it('should render PJ fields if type is PJ', () => {
		render(
			<ClientCard client={mockClientPJ} onConfirm={jest.fn} onEdit={jest.fn} />
		);
		const cpf = screen.queryByText(mockClientPF['cpf']);
		const name = screen.queryByText(mockClientPF['name']);

		expect(cpf).not.toBeInTheDocument();
		expect(name).not.toBeInTheDocument();

		screen.getByText(mockClientPJ['cnpj']);
		screen.getByText(mockClientPJ['name_fantasy']);
		screen.getByText(mockClientPJ['corporate_name']);
	});

	it('should call onEdit on click in Editar', async () => {
		const onEdit = jest.fn();
		render(
			<ClientCard client={mockClientPJ} onConfirm={jest.fn} onEdit={onEdit} />
		);

		const editButton = screen.getByRole('button', { name: 'Editar' });
		await userEvent.click(editButton);
		expect(onEdit).toHaveBeenCalled();
	});

	it('should call onConfirm on click in Deletar', async () => {
		const onConfirm = jest.fn();
		render(
			<ClientCard
				client={mockClientPJ}
				onConfirm={onConfirm}
				onEdit={jest.fn}
			/>
		);

		const deleteButton = screen.getByRole('button', { name: 'Deletar' });
		await userEvent.click(deleteButton);

		screen.getByText('Tem certeza que deseja deletar?');
		const confirmDeleteButton = screen.getByRole('button', {
			name: 'CONFIRMAR',
		});
		await userEvent.click(confirmDeleteButton);
		expect(onConfirm).toHaveBeenCalledWith(mockClientPJ['id']);
	});
});
