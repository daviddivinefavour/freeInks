import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { ValidationError, DatabaseError, Error } from 'sequelize';
import { IRequestWithUser } from './types';
import jwt from 'jsonwebtoken';
import winston from 'winston';
import { failingResult } from './respond';

export const validationError = (err: yup.ValidationError) => {
  const errors = Object.values(err.errors).map(e => e);
  return { status: false, message: errors.length > 0 ? errors[0] : 'Unknown validation error' };
};

const dbErrorHandler = (error: any) => {
  if (error instanceof ValidationError) {
    const validationErrors = error.errors.map(err => err.message);
    return { status: false, message: validationErrors[0] };
  }
  if (error instanceof DatabaseError) {
    console.log('DB ERROR: ', error);
    return { status: false, message: 'Something went wrong connecting to database' };
  }
  if (error instanceof Error) {
    return { status: false, message: 'Something went wrong' };
  }
  return { status: true, message: '' };
};

export const appError = (error: any) => {
  if (error instanceof yup.ValidationError) {
    return validationError(error);
  }
  const dbError = dbErrorHandler(error);
  if (!dbError.status) return dbError;
  return { status: false, message: 'Internal Server error' };
};

export const HandleJwtTokenErrors = (err: any) => {
  if (err instanceof jwt.JsonWebTokenError) {
    winston.error(`JWT Errors ==> [JsonWebTokenError]: ${err} <<<`);
    return failingResult(err.message);
  }
  if (err instanceof jwt.TokenExpiredError) {
    winston.error(`JWT Errors ==> [TokenExpiredError]: ${err} <<<`);
    return failingResult(err.message);
  }
  winston.error(`JWT ->>> NotBeforeError: ${err} <<<`);
  return failingResult(err.message);
};

export const use = (fn: RequestHandler) => {
  return (req: Request | IRequestWithUser, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
};
