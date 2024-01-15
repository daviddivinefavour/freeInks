import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import routes from '@app/routes/v1';
import logMaster from '@app/common/logger';
const app: Express = express();

const whitelist = ['http://localhost:3003', '*'];

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

routes(app); // server listens to requests on these routes
logMaster(); // attaching configurations for winston logger to current server instance.

export default app;
