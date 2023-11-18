import { THttpResponseWithEntity, THttpResponse } from './types';

export const HTTP_200 = ({
  customMessage,
  entity,
}: {
  customMessage?: string;
  entity: Record<string, any>;
}): THttpResponseWithEntity => ({
  status: 200,
  title: 'OK',
  message: customMessage || 'Operation Successful',
  entity,
});

export const HTTP_201 = ({
  customMessage,
  entity,
}: {
  customMessage?: string;
  entity: Record<string, any>;
}): THttpResponseWithEntity => ({
  status: 201,
  title: 'Created',
  message: customMessage || 'Resource successfully created',
  entity,
});

export const HTTP_204 = (customMessage?: string): THttpResponse => ({
  status: 204,
  title: 'No Content',
  message: customMessage || 'Request successfully processed, but no content to return',
});

export const HTTP_400 = (customMessage?: string): THttpResponse => ({
  status: 400,
  title: 'Bad Request',
  message: customMessage || 'The server could not understand the request',
});

export const HTTP_401 = (customMessage?: string): THttpResponse => ({
  status: 401,
  title: 'Unauthorized',
  message: customMessage || 'Authentication is required and has failed or not yet been provided',
});

export const HTTP_403 = (customMessage?: string): THttpResponse => ({
  status: 403,
  title: 'Forbidden',
  message: customMessage || 'You are not authorized to perform this action',
});

export const HTTP_404 = (customMessage?: string): THttpResponse => ({
  status: 404,
  title: 'Not Found',
  message: customMessage || 'The requested resource could not be found',
});

export const HTTP_422 = (customMessage?: string): THttpResponse => ({
  status: 422,
  title: 'Unprocessable Entity',
  message: customMessage || 'An error occurred',
});

export const HTTP_500 = (customMessage?: string): THttpResponse => ({
  status: 500,
  title: 'Internal Server Error',
  message: customMessage || "The server has encountered a situation it doesn't know how to handle",
});
