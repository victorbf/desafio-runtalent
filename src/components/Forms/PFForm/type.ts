import { Control, FieldErrors } from 'react-hook-form';
import { PFFormValuesType } from '../../../schemas/clientSchema';

export type FormPFTypes = {
	control: Control<PFFormValuesType>;
	errors: FieldErrors<PFFormValuesType>;
};
