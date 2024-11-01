import { Control, Controller, FieldErrors } from 'react-hook-form';
import { ArrowBack } from '@mui/icons-material';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import PFForm from '../../components/Forms/PFForm';
import PJForm from '../../components/Forms/PJForm';
import CommonForm from '../../components/Forms/CommonForm';
import { PFFormValuesType, PJFormValuesType } from '../../schemas/clientSchema';
import { useNavigate } from 'react-router-dom';
import { FormContainerTypes } from './type';
import { companyType, personType } from '../../consts';
import { FormContent, Title, TitleContent } from './style';

function FormContainer({
	onSubmit,
	control,
	isPF,
	errors,
	buttonText,
	title,
}: FormContainerTypes) {
	const navigate = useNavigate();

	return (
		<div>
			<TitleContent>
				<Button type='button' onClick={() => navigate(-1)}>
					<ArrowBack />
				</Button>
				<Title variant='h3'>{title}</Title>
			</TitleContent>
			<FormContent onSubmit={onSubmit}>
				<Controller
					name='type'
					control={control}
					render={({ field }) => (
						<FormControl fullWidth>
							<InputLabel>Tipo</InputLabel>
							<Select {...field} variant='filled'>
								<MenuItem value={personType}>Pessoa Física (PF)</MenuItem>
								<MenuItem value={companyType}>Pessoa Juridíca (PJ)</MenuItem>
							</Select>
						</FormControl>
					)}
				/>
				{isPF ? (
					<PFForm
						errors={errors as FieldErrors<PFFormValuesType>}
						control={control as Control<PFFormValuesType>}
					/>
				) : (
					<PJForm
						errors={errors as FieldErrors<PJFormValuesType>}
						control={control as Control<PJFormValuesType>}
					/>
				)}
				<CommonForm errors={errors} control={control} />
				<Button type='submit'>{buttonText}</Button>
			</FormContent>
		</div>
	);
}
export default FormContainer;
