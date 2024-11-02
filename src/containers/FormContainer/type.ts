import { Control, FieldErrors } from 'react-hook-form';
import { ClientType } from '../../schemas/clientSchema';

export type FormContainerTypes = {
	onSubmit: (event: React.FormEvent<HTMLFormElement> | undefined) => void;
	isPF: boolean;
	buttonText: string;
	title: string;
	control: Control<ClientType>;
	errors: FieldErrors<ClientType>;
};
