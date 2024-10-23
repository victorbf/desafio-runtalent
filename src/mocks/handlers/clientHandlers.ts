import { http } from 'msw';
import { clientSchema, ClientType } from '../../schemas/clientSchema';
import { v4 as uuidv4 } from 'uuid';

class ClientMap extends Map<string, ClientType> {
	constructor() {
		super();
		const storedClients = sessionStorage.getItem('clients');
		if (storedClients) {
			JSON.parse(storedClients).forEach(
				([key, value]: [string, ClientType]) => {
					this.set(key, value);
				}
			);
		}
	}

	set(key: string, value: ClientType): this {
		super.set(key, value);
		sessionStorage.setItem('clients', JSON.stringify([...this]));
		return this;
	}

	delete(key: string): boolean {
		const result = super.delete(key);
		if (result) {
			sessionStorage.setItem('clients', JSON.stringify([...this]));
		}
		return result;
	}
}

const clients = new ClientMap();

export const clientHandlers = [
	http.get('/clients', async () => {
		return new Response(JSON.stringify([...clients.values()]), { status: 200 });
	}),

	http.get('/clients/:id', async ({ params }) => {
		const { id } = params;
		const client = clients.get(id as string);
		if (!client) {
			return new Response(
				JSON.stringify({ message: 'Cliente não encontrado' }),
				{ status: 404 }
			);
		}
		return new Response(JSON.stringify(client), { status: 200 });
	}),

	http.post('/clients', async ({ request }) => {
		const body = await request.json();
		const id = uuidv4();
		const result = clientSchema.safeParse({ id, ...(body as object) });
		if (!result.success) {
			return new Response(JSON.stringify(result.error.errors), { status: 400 });
		}
		clients.set(id, result.data);
		return new Response(JSON.stringify({ ...result.data }), {
			status: 201,
		});
	}),

	http.put('/clients/:id', async ({ request, params }) => {
		const { id } = params;
		const body = await request.json();
		const result = clientSchema.safeParse(body);
		if (!result.success) {
			return new Response(JSON.stringify(result.error.errors), { status: 400 });
		}
		if (!clients.has(id as string)) {
			return new Response(
				JSON.stringify({ message: 'Cliente não encontrado' }),
				{ status: 404 }
			);
		}
		clients.set(id as string, result.data);
		return new Response(JSON.stringify({ id, ...result.data }), {
			status: 200,
		});
	}),

	http.delete('/clients/:id', ({ params }) => {
		const { id } = params;
		if (!clients.has(id as string)) {
			return new Response(
				JSON.stringify({ message: 'Cliente não encontrado' }),
				{ status: 404 }
			);
		}
		clients.delete(id as string);
		return new Response(null, { status: 204 });
	}),
];
