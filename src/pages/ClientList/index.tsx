import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ClientCard from '../../components/ClientCard';
import { clientSchema, ClientType } from '../../schemas/clientSchema';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
	ActionButton,
	CardList,
	CardListContainer,
	BasicText,
	Title,
} from './styles';
import SnackbarAlert from '../../components/SnackbarAlert';

function ClientList() {
	const [openDeleteErrorSnackbar, setOpenDeleteErrorSnackbar] =
		useState<boolean>(false);
	const navigate = useNavigate();
	const url = '/clients';

	const fetchClients = async () => {
		const response = await fetch(url);
		const data = await response.json();
		const result = clientSchema.array().safeParse(data);
		if (!result.success) {
			throw new Error('error');
		}
		return result.data;
	};
	const queryClient = useQueryClient();

	async function deleteClient(id: ClientType['id']) {
		const response = await fetch(`${url}/${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) {
			throw new Error('Erro ao deletar o cliente');
		}

		return await response.json();
	}

	const deleteMutation = useMutation({
		mutationFn: deleteClient,
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['clients'] });
		},
		onError: () => {
			setOpenDeleteErrorSnackbar(true);
		},
	});

	const { isLoading, data, error } = useQuery({
		queryKey: ['clients'],
		queryFn: fetchClients,
	});

	return (
		<CardListContainer>
			<Title variant='h3'>Lista de Clientes</Title>
			{error && <BasicText>Ocorreu um erro ao carregar clientes.</BasicText>}
			{isLoading && <BasicText>Loading...</BasicText>}
			{data?.length === 0 && (
				<BasicText>Nenhum cliente... crie novos!</BasicText>
			)}
			<CardList>
				{data?.map((client) => (
					<ClientCard
						client={client}
						key={client.id}
						onEdit={() => navigate(`/clients/edit/${client.id}`)}
						onConfirm={(id) => deleteMutation.mutate(id)}
					/>
				))}
			</CardList>
			<ActionButton type='button' onClick={() => navigate('/clients/new')}>
				<Add />
			</ActionButton>
			<SnackbarAlert
				open={openDeleteErrorSnackbar}
				setOpen={setOpenDeleteErrorSnackbar}
				message='Ocorreu um erro ao deletar cliente.'
			/>
		</CardListContainer>
	);
}

export default ClientList;
