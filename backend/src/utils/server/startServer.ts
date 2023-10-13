import { ApolloServer, ExpressContext } from "apollo-server-express";
import { Express } from 'express'

export const startServer = async (
  app: Express,
  port: string | 4000,
  server: ApolloServer<ExpressContext>
) => {
  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: false,
  });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
