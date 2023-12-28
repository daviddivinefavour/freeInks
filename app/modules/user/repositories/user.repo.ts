import User from '../models/user.model';
import { TCreateUserAttributes } from '../types/user.types';

export const CreateUserQuery = async (createUserDto: TCreateUserAttributes): Promise<User> =>
  User.create(createUserDto as User);
