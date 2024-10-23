import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema, ClientType } from '../../schemas/clientSchema';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../containers/FormContainer';
import { personType } from '../../utils';
import SnackbarAlert from '../../components/SnackbarAlert';
import { useState } from 'react';

function CreateClient() {
	const navigate = useNavigate();
	const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<ClientType>({
		resolver: zodResolver(clientSchema),
		defaultValues: {
			type: personType,
		},
	});

	const watchType: ClientType['type'] = watch('type');

	const onSubmit = async (data: ClientType) => {
		try {
			const response = await fetch('/clients', {
				method: 'POST',
				headers: {
					'Content-Type': 'aplication/json',
				},
				body: JSON.stringify({ ...data }),
			});

			if (!response.ok) {
				throw new Error('Erro ao criar client');
			}

			await response.json();
			navigate('/clients');
		} catch (error) {
			setOpenErrorSnackbar(true);
		}
	};

	return (
		<>
			<FormContainer
				onSubmit={handleSubmit(onSubmit)}
				control={control}
				isPF={watchType === personType}
				errors={errors}
				buttonText='Criar cliente'
				title='Criar novo cliente'
			/>
			<SnackbarAlert
				open={openErrorSnackbar}
				setOpen={setOpenErrorSnackbar}
				message='Ocorreu um erro ao criar cliente!'
			/>
		</>
	);
}

export default CreateClient;
