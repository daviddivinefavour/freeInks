import Permission from '@app/modules/permission/models/permission.model';
import User from '../models/user.model';
import { TCreateUserAttributes } from '../types/user.types';

const CreateUserQuery = async (createUserDto: TCreateUserAttributes): Promise<User> =>
  User.create(createUserDto as User);

const GetUserByIdQuery = async (userId: string): Promise<User | null> =>
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

const FindOneUserQuery = async (query: Partial<TCreateUserAttributes>): Promise<User | null> =>
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

const SimpleFindOneUserQuery = async (query: Partial<TCreateUserAttributes>): Promise<User | null> =>
  User.findOne({
    where: { ...query },
  });

const DeleteUserQuery = async (userId: string) => User.destroy({ where: { id: userId } });

export default { CreateUserQuery, GetUserByIdQuery, FindOneUserQuery, SimpleFindOneUserQuery, DeleteUserQuery };
