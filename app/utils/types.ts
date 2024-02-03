import { Request } from 'express';

export interface IHttpResponse<T> {
  statusCode: number;
  title: string;
  message: string;
  entity?: T;
}

export type TFunctionResult<T> = {
  message: string;
} & ({ status: false } | { status: true; data: T });

export interface IRequestWithUser extends Request {
  user?: any;
}
