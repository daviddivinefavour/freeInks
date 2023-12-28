import { Table, Column, Model } from 'sequelize-typescript';
import { EUserRole, EUserStatus } from '../types/user.types';
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

  @Column
  deletedAt?: any;
}
