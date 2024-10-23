import { FormsTypes } from '../../components/Forms/CommonForm/type';

export type FormContainerTypes = {
	onSubmit: (event: React.FormEvent<HTMLFormElement> | undefined) => void;
	isPF: boolean;
	buttonText: string;
	title: string;
} & FormsTypes;
