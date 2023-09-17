// db.ts

import { IMain, IDatabase } from 'pg-promise';
import pgPromise from 'pg-promise';
import {passwordDb, userDb, nameDb} from './secret'

const initOptions = {}; // You can add options here if needed.

const pgp: IMain = pgPromise(initOptions);

const connection = {
  host: 'localhost',
  port: 5432, // PostgreSQL default port
  database: nameDb,
  user: userDb,
  password: passwordDb,
};

const db: IDatabase<any> = pgp(connection);

export { db };
