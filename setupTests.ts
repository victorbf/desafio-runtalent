import '@testing-library/jest-dom';
import { server } from './src/mocks/serverTest';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
