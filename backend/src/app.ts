import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import schema from '../graphql/schema';

const app = express();
const port = process.env.PORT || 4000;

// Utilisez cors pour configurer les règles CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Créez une instance d'Apollo Server avec votre schéma GraphQL
const server = new ApolloServer({
  schema, // Votre schéma GraphQL que vous avez défini précédemment
});

async function startServer() {
  // Attendez que le serveur Apollo démarre
  await server.start();

  // Appliquez Apollo Server comme middleware sur la route /graphql
  server.applyMiddleware({ app, path: '/graphql' });

  // Lancez votre application Express
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  app.post('/graphql', (req, res) => {
    console.log('Requête reçue sur /graphql'); // Ajoutez cette ligne
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Si nécessaire
    console.log('Après mutation');

    // Votre gestionnaire GraphQL ici
  });
}

// Appelez la fonction pour démarrer le serveur
startServer();



