import { Control, FieldErrors } from 'react-hook-form';
import { PJFormValuesType } from '../../../schemas/clientSchema';

export type FormPJTypes = {
	control: Control<PJFormValuesType>;
	errors: FieldErrors<PJFormValuesType>;
};
