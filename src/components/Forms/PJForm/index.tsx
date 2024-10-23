import { TextField } from '@mui/material';
import { cnpjRegex } from '../../../regex';
import { FormPJTypes } from './type';
import InputMask from 'react-input-mask';
import { Controller } from 'react-hook-form';
import TextInput from '../../TextInput';
import { FormErrorText } from '../../FormErrorText/styles';

function PJForm({ control, errors }: FormPJTypes) {
	return (
		<>
			<div>
				<TextInput
					name='name_fantasy'
					label='Nome Fantasia'
					control={control}
				/>
				{errors.name_fantasy && (
					<FormErrorText>*{errors.name_fantasy.message}</FormErrorText>
				)}
			</div>
			<div>
				<TextInput
					name='corporate_name'
					label='Razão Social'
					control={control}
				/>
				{errors.corporate_name && (
					<FormErrorText>*{errors.corporate_name.message}</FormErrorText>
				)}
			</div>
			<div>
				<Controller
					name='cnpj'
					control={control}
					rules={{
						required: 'O CNPJ é obrigatório',
						pattern: {
							value: cnpjRegex,
							message: 'Formato de CNPJ inválido (ex: 12.345.678/1234-56)',
						},
					}}
					render={({ field }) => (
						<InputMask mask='99.999.999/9999-99' {...field}>
							<TextField label='CNPJ' variant='filled' fullWidth />
						</InputMask>
					)}
				/>
				{errors.cnpj && <FormErrorText>*{errors.cnpj.message}</FormErrorText>}
			</div>
		</>
	);
}

export default PJForm;
