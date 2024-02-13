/* eslint-disable no-unused-vars */
import { HandleJwtTokenErrors } from '@app/utils/errors';
import { passingResult } from '@app/utils/respond';
import jwt from 'jsonwebtoken';

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET as unknown as string;
const CLIENT_JWT_SECRET = process.env.CLIENT_JWT_SECRET as unknown as string;
const JWT_TOKEN_EXPIRY = process.env.JWT_TOKEN_EXPIRY as unknown as string;

type TPayLoad = {
  id: string;
  email: string;
};

const generateJWTToken = async (payLoad: TPayLoad, useClientSecretKey = true) => {
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

const verifyJWTToken = async (token: string, useClientSecretKey = true) => {
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
