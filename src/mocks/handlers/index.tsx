import { clientHandlers } from './clientHandlers';
import { successHandlers } from './testHandlers';

export const handlers = [...clientHandlers];
export const setupTestHandlers = [...successHandlers];
