import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';

const app: Express = express();

const whitelist = ['*', 'http://localhost:3003'];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (origin && (whitelist.includes('*') || whitelist.indexOf(origin) !== -1)) {
      callback(null, true);
    } else {
      callback(new Error('Access denied'));
    }
  },
};

app.use(cors(corsOptions), express.json(), express.urlencoded({ extended: true }));

export default app;
