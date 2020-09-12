import express from 'express';
import cors from 'cors';
import { BACKEND_PORT, FRONTEND_URLS, DB_NAME } from '@app/common';
import { createConnection } from 'typeorm';

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
    entities: [__dirname + '/../entities/*.*']
  });

  // Express App
  const app = express();

  // CORS Middleware
  app.use(
    cors({
      credentials: true,
      origin: FRONTEND_URLS
    })
  );

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
