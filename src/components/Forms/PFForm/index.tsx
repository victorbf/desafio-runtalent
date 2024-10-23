import { TextField } from '@mui/material';
import { cpfRegex } from '../../../regex';
import { FormPFTypes } from './type';
import InputMask from 'react-input-mask';
import { FormErrorText } from '../../FormErrorText/styles';
import { Controller } from 'react-hook-form';
import TextInput from '../../TextInput';

function PFForm({ errors, control }: FormPFTypes) {
	return (
		<>
			<div>
				<TextInput name='name' control={control} label='Nome' />
				{errors.name && <FormErrorText>*{errors.name.message}</FormErrorText>}
			</div>
			<div>
				<Controller
					name='cpf'
					control={control}
					rules={{
						required: 'O CPF é obrigatório',
						pattern: {
							value: cpfRegex,
							message: 'Formato de CPF inválido (ex: 123.456.789-00)',
						},
					}}
					render={({ field }) => (
						<InputMask mask='999.999.999-99' {...field}>
							<TextField fullWidth label='CPF' variant='filled' />
						</InputMask>
					)}
				/>
				{errors.cpf && <FormErrorText>*{errors.cpf.message}</FormErrorText>}
			</div>
		</>
	);
}

export default PFForm;
