import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import schema from '../graphql/schema';

const app = express();
const port = process.env.PORT || 4000;

// Liste des origines autorisées pour les requêtes CORS
const whitelist = ['http://localhost:3000'];

// Configuration CORS
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

//Affichage page
app.get('/', (req, res) => {
  res.send('Hello, World !');
});
app.get('/', (req, res) => {
  res.send('Hello, GraphQl !');
});

// Configuration du serveur Apollo GraphQL
const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
});

// Démarrage du serveur
const startServer = async () => {
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

startServer();
