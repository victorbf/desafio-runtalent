import { http } from 'msw';

export const handlers = [
  // FIX
  http.get("/hello", () => {
    return Response.json({
      response: 'hello world'
    });
  }),
];
