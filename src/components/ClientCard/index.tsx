import { Person, Apartment } from '@mui/icons-material';
import { Button, CardContent, Typography } from '@mui/material';
import ActionDialog from '../ActionDialog';
import { CardBase, Title, CardActions } from './styles';
import { companyType } from '../../utils';
import { ClientCardProps } from './type';

function ClientCard({ client, onEdit, onConfirm }: ClientCardProps) {
	const isCompany = client.type === companyType;

	return (
		<CardBase key={client.id}>
			<CardContent>
				<Title gutterBottom variant='h5'>
					{isCompany ? <Apartment /> : <Person />}
					{isCompany ? client.name_fantasy : client.name}
				</Title>
				{isCompany && (
					<Typography variant='subtitle2'>{client.corporate_name}</Typography>
				)}
				<Typography variant='subtitle2'>{client.email}</Typography>
				<Typography variant='caption'>
					{isCompany ? client.cnpj : client.cpf}
				</Typography>
				<Typography variant='subtitle1'>{client.phone}</Typography>
			</CardContent>
			<CardActions>
				<ActionDialog
					confirmButtonText='CONFIRMAR'
					title='Tem certeza que deseja deletar?'
					onConfirm={() => onConfirm(client.id)}
					openDialogButtonText='Deletar'
					color='error'
				/>
				<Button size='small' onClick={onEdit}>
					Editar
				</Button>
			</CardActions>
		</CardBase>
	);
}

export default ClientCard;
