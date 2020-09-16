export const BACKEND_PORT: number = 4002;
export const BACKEND_URL: string = `http://localhost:${BACKEND_PORT}`;

export const FRONTEND_URLS: string[] = [
  'http://localhost:3000',
  'http://localhost:3001'
];

export const BUCKET_URL: string = `${BACKEND_URL}/images/`;

export const DB_NAME: string = 'app_db';

export const BCRYPT_SALT: number = 12;

export const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PROJECT_NAME: string = 'APP';