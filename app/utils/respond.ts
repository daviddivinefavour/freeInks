import { Response } from 'express';
import { TFunctionResult, IHttpResponse } from './types';

export const sendHttpResponse = <T>(data: IHttpResponse<T>, res: Response) =>
  data.entity
    ? res.status(data.statusCode).send({ title: data.title, message: data.message, entity: data.entity })
    : res.status(data.statusCode).send({ title: data.title, message: data.message });

const returnResult = <T>({
  status,
  message,
  data,
}: {
  status: boolean;
  message: string;
  data: T;
}): TFunctionResult<T> => ({
  status,
  message,
  data,
});

export const passingResult = <T>(message: string, data: T) =>
  returnResult({
    status: true,
    message,
    data,
  });

export const failingResult = (message: string) =>
  returnResult({
    status: false,
    message,
    data: undefined,
  });
