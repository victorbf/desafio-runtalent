import { useForm } from 'react-hook-form';
import PJForm from './';
import { clientSchema, PJFormValuesType } from '../../../schemas/clientSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyType } from '../../../consts';

const MockPJForm = ({ onSubmit }: { onSubmit: () => void }) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<PJFormValuesType>({
		resolver: zodResolver(clientSchema),
		defaultValues: {
			type: companyType,
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<PJForm control={control} errors={errors} />
			<button type='submit'>Submit</button>
		</form>
	);
};

export default MockPJForm;
