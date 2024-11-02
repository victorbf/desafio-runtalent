import { useForm } from 'react-hook-form';
import FormContainer from './';
import { zodResolver } from '@hookform/resolvers/zod';
import { personType } from '../../consts';
import { clientSchema, ClientType } from '../../schemas/clientSchema';
import { BrowserRouter } from 'react-router-dom';

const MockFormContainer = ({
	onSubmit,
	isPF,
}: {
	onSubmit: () => void;
	isPF: boolean;
}) => {
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
		<BrowserRouter>
			<FormContainer
				control={control}
				errors={errors}
				isPF={isPF}
				buttonText='Submit'
				onSubmit={handleSubmit(onSubmit)}
				title='Form Container'
			/>
		</BrowserRouter>
	);
};

export default MockFormContainer;
