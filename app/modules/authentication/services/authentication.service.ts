import { CreateUserSchema } from '@app/modules/user/schemas/user.schema';
import { CreateUserService, DeleteUserService } from '@app/modules/user/services/user.service';
import { EUserStatus } from '@app/modules/user/types/user.types';
import { requestBodyValidator } from '@app/utils/validator';
import { v4 as uuid } from 'uuid';
import { IUserRegistrationOptions } from '../types/authentication.types';
import { HTTP_201, HTTP_422 } from '@app/utils/http-response';
import { CreateAuthenticationQuery } from '../repositories/authentication.repo';
import { EAuthenticatedUser } from '../types/authentication.types';
import { hashString } from '@app/utils/helpers';
import winston from 'winston';

export const RegisterUserService = async (createUserDto: IUserRegistrationOptions) => {
  const validatedDto = await requestBodyValidator({ payload: createUserDto, schema: CreateUserSchema });
  if (!validatedDto.status) return HTTP_422(validatedDto.message);

  const userId = uuid();
  const user = await CreateUserService({
    id: userId,
    ...createUserDto,
    status: EUserStatus.INACTIVE,
  });
  if (!user.status) return HTTP_422(user.message);

  const userAuth = await CreateAuthenticationQuery({
    id: uuid(),
    authenticatedId: userId,
    authenticatedType: EAuthenticatedUser.CLIENT,
    password: hashString(createUserDto.password),
  });
  if (!userAuth) {
    await DeleteUserService(userId);
    winston.error('Failed to create user authentication');
    return HTTP_422();
  }

  return HTTP_201({ customMessage: user.message, entity: user });
};
