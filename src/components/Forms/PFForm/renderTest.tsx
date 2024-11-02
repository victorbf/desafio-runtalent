import { useForm } from 'react-hook-form';
import PFForm from './';
import { clientSchema, PFFormValuesType } from '../../../schemas/clientSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { personType } from '../../../consts';

const MockPFForm = ({ onSubmit }: { onSubmit: () => void }) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<PFFormValuesType>({
		resolver: zodResolver(clientSchema),
		defaultValues: {
			type: personType,
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<PFForm control={control} errors={errors} />
			<button type='submit'>Submit</button>
		</form>
	);
};

export default MockPFForm;
