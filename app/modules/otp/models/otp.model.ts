import User from '@app/modules/user/models/user.model';
import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({
  tableName: 'otps',
  timestamps: true,
  underscored: true,
  modelName: 'Otp',
})
export default class Otp extends Model<Otp> {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @Column
  hashedOtp: string;

  @Column
  expiredAt: string;

  @Column
  attempts: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}
