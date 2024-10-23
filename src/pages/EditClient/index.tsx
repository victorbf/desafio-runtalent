import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema, ClientType } from '../../schemas/clientSchema';
import { useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../../containers/FormContainer';
import { useQuery } from '@tanstack/react-query';
import { Button, Typography } from '@mui/material';
import { personType } from '../../utils';
import SnackbarAlert from '../../components/SnackbarAlert';

function EditClient() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [openSuccessSnackbar, setOpenSuccessSnackbar] =
		useState<boolean>(false);
	const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);

	const url = `/clients/${id}`;
	async function fetchClient() {
		const response = await fetch(url);
		const data = await response.json();
		const result = clientSchema.safeParse(data);
		if (!result.success) {
			throw new Error('error');
		}
		return result.data;
	}

	const {
		isLoading,
		data: clientData,
		error: clientError,
	} = useQuery({
		queryKey: ['client'],
		queryFn: fetchClient,
	});

	const {
		control,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<ClientType>({
		resolver: zodResolver(clientSchema),
	});
	const watchType: ClientType['type'] = watch('type');

	async function onSubmit(data: ClientType) {
		try {
			const response = await fetch(`/clients/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'aplication/json',
				},
				body: JSON.stringify({ ...data, id }),
			});

			if (!response.ok) {
				throw new Error('Erro ao criar client');
			}

			await response.json();
			setOpenSuccessSnackbar(true);
		} catch (error) {
			setOpenErrorSnackbar(true);
		}
	}

	useEffect(() => {
		if (clientData) {
			Object.entries(clientData).forEach(([key, value]) => {
				const typedKey = key as keyof ClientType;
				setValue(typedKey, value);
			});
		}
	}, [clientData, setValue]);

	return (
		<>
			{isLoading && <Typography>Loading...</Typography>}
			{clientError && (
				<div>
					<Typography>Ocorreu um erro ao carregar página</Typography>
					<Button onClick={() => navigate(-1)}>Voltar</Button>
				</div>
			)}
			{!clientData && (
				<div>
					<Typography>Nenhum item carregado</Typography>
					<Button onClick={() => navigate(-1)}>Voltar</Button>
				</div>
			)}
			{clientData && (
				<FormContainer
					onSubmit={handleSubmit(onSubmit)}
					control={control}
					isPF={watchType === personType}
					errors={errors}
					buttonText='Editar cliente'
					title={`Editando cliente ${clientData.name || clientData.fantasy_name}`}
				/>
			)}
			<SnackbarAlert
				setOpen={setOpenSuccessSnackbar}
				open={openSuccessSnackbar}
				message='Cliente editado com sucesso!'
			/>
			<SnackbarAlert
				setOpen={setOpenErrorSnackbar}
				open={openErrorSnackbar}
				message='Ocorreu um erro ao editar cliente.'
			/>
		</>
	);
}

export default EditClient;
