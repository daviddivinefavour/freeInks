import { Response } from 'express';
import { THttpResponseWithEntity } from './types';

const createResult = (isSuccess: boolean, data: any) => ({ isSuccess, ...data });

export const createFailureResult = (err: string) =>
  createResult(false, {
    status: 422,
    title: 'Oops something went wrong',
    message: err,
  });

export const createSuccessResult = ({
  status,
  title,
  message,
  entity,
}: {
  status: number;
  title: string;
  message: string;
  entity?: Record<string, any>;
}) =>
  createResult(true, {
    status,
    title,
    message,
    entity,
  });

export const sendHttpResponse = (data: THttpResponseWithEntity, res: Response) =>
  res.send({ status: data.status, title: data.title, message: data.message, entity: data.entity });
