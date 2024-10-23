import { Close } from '@mui/icons-material';
import { IconButton, Snackbar } from '@mui/material';
import { SnackbarAlertProps } from './type';

function SnackbarAlert({ setOpen, open, message }: SnackbarAlertProps) {
	const action = (
		<IconButton
			size='small'
			aria-label='close'
			color='inherit'
			onClick={() => setOpen(false)}
		>
			<Close fontSize='small' />
		</IconButton>
	);
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={() => setOpen(false)}
			message={message}
			action={action}
		/>
	);
}

export default SnackbarAlert;
