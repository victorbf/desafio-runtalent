import { http, HttpResponse } from 'msw';
import { mockClientPF, mockClientPJ } from '../../tests_mocks';

export const successHandlers = [
	http.get('/clients', async () => {
		return new Response(JSON.stringify([mockClientPF, mockClientPJ]), {
			status: 200,
		});
	}),
	http.delete('/clients/:id', async () => {
		return new Response(JSON.stringify({}), {
			status: 200,
		});
	}),
];

export const errorFetchHandler = [
	http.get('/clients', async () => {
		return new HttpResponse(null, { status: 500 });
	}),
];

export const errorDeleteHandler = [
	http.delete('/clients/:id', async () => {
		return new HttpResponse(null, { status: 500 });
	}),
];

export const emptyHandler = [
	http.get('clients', async () => {
		return new Response(JSON.stringify([]), {
			status: 200,
		});
	}),
];
