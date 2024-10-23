import { ClientType } from '../../schemas/clientSchema';

export type ClientCardProps = {
	client: ClientType;
	onEdit: () => void;
	onConfirm: (id: ClientType['id']) => void;
};
