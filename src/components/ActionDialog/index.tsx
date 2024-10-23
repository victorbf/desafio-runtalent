import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { ActionDialogProps } from './type';

function ActionDialog({
	title,
	openDialogButtonText,
	onConfirm,
	confirmButtonText,
	...rest
}: ActionDialogProps) {
	const [open, setOpen] = useState(false);

	const handleConfirm = () => {
		onConfirm();
		setOpen(false);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button onClick={handleClickOpen} {...rest}>
				{openDialogButtonText}
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{title}</DialogTitle>
				<DialogActions>
					<Button color='inherit' onClick={handleClose}>
						Voltar
					</Button>
					<Button onClick={handleConfirm} autoFocus {...rest}>
						{confirmButtonText}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default ActionDialog;
