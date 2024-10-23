import { z } from 'zod';
import { cnpjRegex, cpfRegex, phoneRegex } from '../regex';

const clientPFSchema = z.object({
	type: z.literal('PF'),
	id: z.string().optional(),
	name: z.string().min(1, 'Nome é obrigatório'),
	cpf: z.string().regex(cpfRegex, 'CPF inválido'),
	email: z.string().email('Email inválido'),
	phone: z
		.string()
		.regex(phoneRegex, 'Telefone deve ter o formato (DD) 9XXXX-XXXX'),
});

const clientPJSchema = z.object({
	type: z.literal('PJ'),
	id: z.string().optional(),
	name_fantasy: z.string().min(1, 'Nome Fantasia é obrigatório'),
	corporate_name: z.string().min(1, 'Razão Social é obrigatória'),
	cnpj: z.string().regex(cnpjRegex, 'CNPJ inválido'),
	email: z.string().email('Email inválido'),
	phone: z
		.string()
		.regex(phoneRegex, 'Telefone deve ter o formato (DD) 9XXXX-XXXX'),
});

export const clientSchema = z.discriminatedUnion('type', [
	clientPFSchema,
	clientPJSchema,
]);

export type ClientType = z.infer<typeof clientSchema>;
export type PFFormValuesType = z.infer<typeof clientPFSchema>;
export type PJFormValuesType = z.infer<typeof clientPJSchema>;
