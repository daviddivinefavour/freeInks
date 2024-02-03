import { EUserRole, EUserStatus, ISignUpOptions, TCreateUserAttributes } from '../types/user.types';
import { failingResult, passingResult } from '@app/utils/respond';
import { CreateUserQuery, DeleteUserQuery, SimpleFindOneUserQuery } from '../repositories/user.repo';
import { requestBodyValidator } from '@app/utils/validator';
import { CreateUserSchema } from '../schemas/user.schema';
import { v4 } from 'uuid';
// import { IReturnFromService } from '@app/utils/types';

const CreateUserService = async (createUserDto: ISignUpOptions, role: any) => {
  const validatedDto = await requestBodyValidator({ payload: createUserDto, schema: CreateUserSchema });
  if (!validatedDto.status) return failingResult(validatedDto.message);

  const userExists = await SimpleFindOneUserQuery({ email: createUserDto.email });
  if (userExists) return failingResult('User already exists.');

  const user = await CreateUserQuery({
    id: v4(),
    status: EUserStatus.INACTIVE,
    role: role === EUserRole.AUTHOR ? EUserRole.AUTHOR : EUserRole.READER,
    ...createUserDto,
  });
  if (!user) return failingResult('Could not create new user');

  return passingResult('Successfully created new user', user);
};

const DeleteUserService = async (userId: string) => {
  const deleted = await DeleteUserQuery(userId);
  if (!deleted) return failingResult('An error occurred');
  return passingResult('Successfully deleted user.', deleted);
};

export default { CreateUserService, DeleteUserService };
