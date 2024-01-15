import { Table, Column, Model, BelongsToMany, DataType } from 'sequelize-typescript';
import { EUserRole, EUserStatus } from '../types/user.types';
import UserPermission from '@app/modules/permission/models/user-permission.model';
import { TUserPermission } from '@app/modules/permission/types/permission.types';
import Permission from '@app/modules/permission/models/permission.model';
@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
  modelName: 'User',
  paranoid: true,
})
export default class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  phoneNumber?: string;

  @Column
  isEmailVerified: boolean;

  @Column
  verifiedAt: string;

  @Column
  status: EUserStatus;

  @Column
  profileImageUrl?: string;

  @Column
  role!: EUserRole;

  @Column(DataType.DATE)
  deletedAt?: any;

  @BelongsToMany(() => Permission, () => UserPermission)
  permissions: TUserPermission[];
}
