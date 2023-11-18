import { Express, Request, Response, NextFunction } from 'express';
import { HTTP_204 } from '../../utils/http-response';

const routes = (app: Express) => {
  app.use('/api/v1/', (req: Request, res: Response) => res.send(HTTP_204('Welcome to FreeInks')));

  app.all('*', (req: Request, res: Response) =>
    res.status(404).send({
      status: 404,
      message: "Oops the url has been moved or doesn't exist",
    })
  );
};
export default routes;
