import { Express, Request, Response, NextFunction } from 'express';
import { HTTP_204, HTTP_404 } from '../../utils/http-response';
import { sendHttpResponse } from '../../utils/respond';

const routes = (app: Express) => {
  app.get('/api/v1/', (req: Request, res: Response) => sendHttpResponse(HTTP_204('Welcome to FreeInks'), res));
  // post endpoint to test  express.json(),
  app.post('/api/v1/', (req, res) => res.send(req.body));
  app.all('*', (req: Request, res: Response) =>
    sendHttpResponse(HTTP_404("Oops the URL has been moved or doesn't exist"), res)
  );
};

export default routes;
