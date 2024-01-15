import { TCreateUserAttributes } from '../types/user.types';
import { failingResult, passingResult } from '@app/utils/respond';
import { CreateUserQuery, DeleteUserQuery, SimpleFindOneUserQuery } from '../repositories/user.repo';

export const CreateUserService = async (createUserDto: TCreateUserAttributes) => {
  const userExists = await SimpleFindOneUserQuery({ email: createUserDto.email });
  if (userExists) return failingResult('User already exists.');

  const user = await CreateUserQuery({
    ...createUserDto,
  });
  if (!user) return failingResult('Could not create new user');

  return passingResult('Successfully created new user', user);
};

export const DeleteUserService = async (userId: string) => {
  const deleted = await DeleteUserQuery(userId);
  if (!deleted) return failingResult('Could not delete associated user');
  return passingResult('Successfully deleted user.', deleted);
};
