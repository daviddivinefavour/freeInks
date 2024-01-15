import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({
  tableName: 'permissions',
  timestamps: true,
  underscored: true,
  modelName: 'Permission',
  paranoid: true,
})
export default class Permission extends Model<Permission> {
  @Column
  name: string;

  @Column
  description?: string;

  @Column
  isActive: boolean;

  @Column(DataType.DATE)
  deletedAt?: any;
}
