import { PFFormValuesType, PJFormValuesType } from './schemas/clientSchema';

export const mockClientPF: PFFormValuesType = {
	id: '123',
	type: 'PF',
	name: 'Cliente Teste',
	cpf: '123.456.789-10',
	email: 'cliente@teste.com',
	phone: '(11) 99999-9999',
};

export const mockClientPJ: PJFormValuesType = {
	id: '456',
	type: 'PJ',
	name_fantasy: 'Empresa Teste',
	corporate_name: 'Exemplo S.A.',
	cnpj: '12.345.678/0001-90',
	email: 'contato@exemplo.com',
	phone: '(11) 99999-9999',
};
