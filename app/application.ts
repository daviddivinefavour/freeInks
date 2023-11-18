import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import routes from './routes/v1';
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

// mount middlewares
app.use(cors(corsOptions), express.json(), express.urlencoded({ extended: true }));
routes(app);

export default app;
