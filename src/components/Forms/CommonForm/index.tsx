import { TextField } from '@mui/material';
import { phoneRegex } from '../../../regex';
import { FormsTypes } from './type';
import InputMask from 'react-input-mask';
import { Controller } from 'react-hook-form';
import { FormErrorText } from '../../FormErrorText/styles';

function CommonForm({ control, errors }: FormsTypes) {
	return (
		<>
			<div>
				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<TextField fullWidth label='Email' variant='filled' {...field} />
					)}
				/>
				{errors.email && <FormErrorText>*{errors.email.message}</FormErrorText>}
			</div>
			<div>
				<Controller
					name='phone'
					control={control}
					rules={{
						required: 'O celular é obrigatório',
						pattern: {
							value: phoneRegex,
							message: 'Formato de celular inválido (ex: (11) 91111-1111)',
						},
					}}
					render={({ field }) => (
						<InputMask mask='(99) 99999-9999' {...field}>
							<TextField fullWidth label='Celular' variant='filled' />
						</InputMask>
					)}
				/>
				{errors.phone && <FormErrorText>*{errors.phone.message}</FormErrorText>}
			</div>
		</>
	);
}

export default CommonForm;
