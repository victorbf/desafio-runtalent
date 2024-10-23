import { ButtonProps } from '@mui/material';

export type ActionDialogProps = {
	title: string;
	onConfirm: () => void;
	confirmButtonText: string;
	openDialogButtonText: string;
} & ButtonProps;
