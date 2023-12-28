import { Table, Column, Model } from 'sequelize-typescript';
import { TAuthenticatedUser } from '../types/authentication.types';
@Table({
  tableName: 'authentications',
  timestamps: true,
  underscored: true,
  modelName: 'Authentication',
  paranoid: true,
})
export default class Authentication extends Model<Authentication> {
  @Column
  password: string;

  @Column
  authenticatedType: TAuthenticatedUser;

  @Column
  authenticatedId!: string;

  @Column
  lastSeen?: string;
}
