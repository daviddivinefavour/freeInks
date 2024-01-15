import Permission from '@app/modules/permission/models/permission.model';
import User from '../models/user.model';
import { TCreateUserAttributes } from '../types/user.types';

export const CreateUserQuery = async (createUserDto: TCreateUserAttributes): Promise<User> =>
  User.create(createUserDto as User);

export const GetUserByIdQuery = async (userId: string): Promise<User | null> =>
  User.findByPk(userId, {
    include: [
      {
        model: Permission,
        through: { attributes: [] },
        attributes: ['id', 'name', 'description', 'isActive'],
        as: 'permissions',
      },
    ],
  });

export const FindOneUserQuery = async (query: Partial<TCreateUserAttributes>): Promise<User | null> =>
  User.findOne({
    where: { ...query },
    include: [
      {
        model: Permission,
        through: { attributes: [] },
        attributes: ['id', 'name', 'description', 'isActive'],
        as: 'permissions',
      },
    ],
  });

export const SimpleFindOneUserQuery = async (query: Partial<TCreateUserAttributes>): Promise<User | null> =>
  User.findOne({
    where: { ...query },
  });

export const DeleteUserQuery = async (userId: string) => User.destroy({ where: { id: userId } });
