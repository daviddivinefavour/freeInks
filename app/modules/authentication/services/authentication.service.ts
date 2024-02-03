import { v4 as uuid } from 'uuid';
import { EAuthenticatedUser } from '../types/authentication.types';
import { hashString } from '@app/utils/helpers';
import winston from 'winston';
import { failingResult, passingResult } from '@app/utils/respond';
import authenticationRepo from '../repositories/authentication.repo';

const CreateUserAuthenticationService = async ({ userId, password }: { userId: string; password: string }) => {
  const userAuth = await authenticationRepo.CreateAuthenticationQuery({
    id: uuid(),
    authenticatedId: userId,
    authenticatedType: EAuthenticatedUser.CLIENT,
    password: hashString(password),
  });
  if (!userAuth) {
    winston.error('Failed to create user authentication');
    return failingResult('An error occurred');
  }

  return passingResult('Successfully saved user auth credentials', {});
};

export default { CreateUserAuthenticationService };
