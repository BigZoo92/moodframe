import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { signup } from './utils';
import { corsOptions, port } from './constant';

// INIT
dotenv.config();
const app = express();
app.use(express.json());

app.use(cors(corsOptions));

// BACKEND'S HOME
app.get('/', (_, res) => {
  res.send('Hello, World!');
});

// SIGNUP'S ROUTE
app.post('/api/auth/signup', (req, res) => signup(req, res));

// START THE SERVER
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
