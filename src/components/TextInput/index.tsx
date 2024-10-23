import { TextField } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';
import { TextInputProps } from './type';

function TextInput<T extends FieldValues>({
	control,
	name,
	label,
}: TextInputProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<TextField label={label} variant='filled' fullWidth {...field} />
			)}
		/>
	);
}

export default TextInput;
