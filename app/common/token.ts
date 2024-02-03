/* eslint-disable no-unused-vars */
import { HandleJwtTokenErrors } from '@app/utils/errors';
import { passingResult } from '@app/utils/respond';
import jwt from 'jsonwebtoken';

const { CLIENT_JWT_SECRET, ADMIN_JWT_SECRET, JWT_TOKEN_EXPIRY } = process.env;

if (!CLIENT_JWT_SECRET || !ADMIN_JWT_SECRET) throw Error('Invalid JWT SECRET');

type TPayLoad = {
  id: string;
  email: string;
};

export const generateJWTToken = async (payLoad: TPayLoad, useClientSecretKey = true) => {
  try {
    const token = useClientSecretKey
      ? await new Promise((resolve, reject) => {
          jwt.sign(payLoad, CLIENT_JWT_SECRET, { algorithm: 'HS256', expiresIn: JWT_TOKEN_EXPIRY }, (err, signature) =>
            err ? reject(err) : resolve(signature)
          );
        })
      : await new Promise((resolve, reject) => {
          jwt.sign(payLoad, ADMIN_JWT_SECRET, { algorithm: 'HS256', expiresIn: JWT_TOKEN_EXPIRY }, (err, signature) =>
            err ? reject(err) : resolve(signature)
          );
        });
    return passingResult('Successfully signed token', token);
  } catch (error) {
    return HandleJwtTokenErrors(error);
  }
};

export const verifyJWTToken = async (token: string, useClientSecretKey = true) => {
  try {
    const decodedToken = useClientSecretKey
      ? await new Promise((resolve, reject) => {
          jwt.verify(token, CLIENT_JWT_SECRET, (err, decoded) => (err ? reject(err) : resolve(decoded)));
        })
      : await new Promise((resolve, reject) => {
          jwt.verify(token, ADMIN_JWT_SECRET, (err, decoded) => (err ? reject(err) : resolve(decoded)));
        });

    return passingResult('Successfully decoded token', decodedToken);
  } catch (error) {
    return HandleJwtTokenErrors(error);
  }
};

export default { generateJWTToken, verifyJWTToken };
