import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { products } from './mockResponses';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(products)
    );
  })
];