import { CreateUserSchema } from '@app/modules/user/schemas/user.schema';
import { EUserStatus } from '@app/modules/user/types/user.types';
import { requestBodyValidator } from '@app/utils/validator';
import { v4 as uuid } from 'uuid';
import { IUserRegistrationOptions } from '../types/authentication.types';
import { HTTP_201, HTTP_422 } from '@app/utils/http-response';
import { CreateAuthenticationQuery } from '../repositories/authentication.repo';
import { EAuthenticatedUser } from '../types/authentication.types';
import { hashString } from '@app/utils/helpers';
import winston from 'winston';
import { failingResult, passingResult } from '@app/utils/respond';

const CreateUserAuthenticationService = async ({ userId, password }: { userId: string; password: string }) => {
  const userAuth = await CreateAuthenticationQuery({
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
