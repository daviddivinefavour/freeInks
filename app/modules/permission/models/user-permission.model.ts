import { Table, Column, Model, HasMany, BelongsToMany, HasOne, ForeignKey } from 'sequelize-typescript';
import User from '../../user/models/user.model';
import Permission from './permission.model';

@Table({
  tableName: 'user_permissions',
  underscored: true,
  modelName: 'UserPermission',
})
export default class UserPermission extends Model<UserPermission> {
  @ForeignKey(() => User)
  @Column
  userId!: string;

  @ForeignKey(() => Permission)
  @Column
  permissionId!: string;
}
