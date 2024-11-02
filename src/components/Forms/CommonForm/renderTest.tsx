import { useForm } from 'react-hook-form';
import CommonForm from './';
import { clientSchema, ClientType } from '../../../schemas/clientSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { personType } from '../../../consts';

const MockCommonForm = ({ onSubmit }: { onSubmit: () => void }) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<ClientType>({
		resolver: zodResolver(clientSchema),
		defaultValues: {
			type: personType,
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<CommonForm control={control} errors={errors} />
			<button type='submit'>Submit</button>
		</form>
	);
};

export default MockCommonForm;
