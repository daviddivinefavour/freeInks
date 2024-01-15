import { HTTP_204, HTTP_404 } from '@app/utils/http-response';
import { sendHttpResponse } from '@app/utils/respond';
import { Express, Request, Response, NextFunction } from 'express';

// import the route handlers for each module
import authenticationRoutes from './authentication.routes';

const routes = (app: Express) => {
  app.get('/api/v1/', (req: Request, res: Response) => sendHttpResponse(HTTP_204('Welcome to FreeInks'), res));

  // plug in the route handlers
  app.use('/api/v1/authenticate', authenticationRoutes);

  // handler for unknown routes
  app.all('*', (req: Request, res: Response) =>
    sendHttpResponse(HTTP_404("Oops the URL has been moved or doesn't exist"), res)
  );
};

export default routes;
