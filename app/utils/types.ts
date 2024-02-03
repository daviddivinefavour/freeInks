import { EUserRole } from '@app/modules/user/types/user.types';
import { Request } from 'express';

// export type THttpResponse = {
//   statusCode: number;
//   title: string;
//   message: string;
// };

// export type THttpResponseWithEntity<T> = THttpResponse & { entity: T };

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
  user?: {
    id: string;
    email: string;
    role?: EUserRole;
  };
}

// export interface IReturnFromService<T> {
//   message: string;
//   status: boolean;
//   data?: T;
// }
