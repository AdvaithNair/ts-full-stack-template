import express from 'express';
import cors from 'cors';
import { BACKEND_PORT, FRONTEND_URLS, DB_NAME } from '@app/common';
import { createConnection } from 'typeorm';
import apiRouter from './routes/apiRoutes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const main = async () => {
  // Connect to Database
  await createConnection({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: DB_NAME,
    synchronize: true,
    logging: true,
    entities: [__dirname + '/entities/*.{ts,js}']
  });

  // Express App
  const app = express();

  // Body Parser Middleware
  app.use(bodyParser.json());

  // Cookie Parser Middleware
  app.use(cookieParser());

  // CORS Middleware
  app.use(
    cors({
      credentials: true,
      origin: FRONTEND_URLS
    })
  );

  // API Router
  app.use('/api', apiRouter);

  // Testing Endpoint
  app.get('/ping', (_req, res) => {
    res.send('pong!');
  });

  // Running Instance of App on Localhost
  app.listen(BACKEND_PORT, () => {
    console.log(`Listening on http://localhost:${BACKEND_PORT}...`);
  });
};

main();
