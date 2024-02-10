import { EUserRole, EUserStatus, ISignUpOptions, IUniqueUserProperties } from '../types/user.types';
import { failingResult, passingResult } from '@app/utils/respond';
import userRepo from '../repositories/user.repo';
import { requestBodyValidator } from '@app/utils/validator';
import { UserRegistrationValidationSchema } from '../schemas/user.schema';
import { v4 } from 'uuid';
// import { IReturnFromService } from '@app/utils/types';

const CreateUserService = async (createUserDto: ISignUpOptions, role: any) => {
  const validatedDto = await requestBodyValidator({ payload: createUserDto, schema: UserRegistrationValidationSchema });
  if (!validatedDto.status) return failingResult(validatedDto.message);

  const userExists = await userRepo.SimpleFindOneUserQuery({ email: createUserDto.email });
  if (userExists) return failingResult('User already exists.');

  const user = await userRepo.CreateUserQuery({
    id: v4(),
    status: EUserStatus.INACTIVE,
    role: role === EUserRole.AUTHOR ? EUserRole.AUTHOR : EUserRole.READER,
    ...createUserDto,
  });
  if (!user) return failingResult('Could not create new user');

  return passingResult('Successfully created new user', user);
};

const DeleteUserService = async (userId: string) => {
  const deleted = await userRepo.DeleteUserQuery(userId);
  if (!deleted) return failingResult('An error occurred');
  return passingResult('Successfully deleted user.', deleted);
};

const GetUserByIdService = async (userId: string) => {
  const user = await userRepo.GetUserByIdQuery(userId);
  if (!user) return failingResult('An error occurred');
  return passingResult('Successfully fetched user data', user);
};

const FindOneUserService = async (query: Partial<IUniqueUserProperties>) => {
  const user = await userRepo.FindOneUserQuery(query);
  if (!user) return failingResult('An error occurred');
  return passingResult('Successfully fetched user data', user);
};

export default { CreateUserService, DeleteUserService, GetUserByIdService, FindOneUserService };
