import { FieldErrors, Control } from 'react-hook-form';
import { ClientType } from '../../../schemas/clientSchema';

export type FormsTypes = {
	control: Control<ClientType>;
	errors: FieldErrors<ClientType>;
};
