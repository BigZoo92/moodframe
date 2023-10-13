import { CorsOptions } from 'cors';
import schema from './graphql';
import { ApolloServer } from 'apollo-server-express';

// WHITELIST
export const whitelist = ['http://localhost:3000'];

// CORS
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

export const port = process.env.PORT || 4000;
// APPOLLO CONFIG
export const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
});
