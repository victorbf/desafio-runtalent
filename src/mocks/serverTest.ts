import { setupServer } from 'msw/node';
import { setupTestHandlers } from './handlers';

export const server = setupServer(...setupTestHandlers);
