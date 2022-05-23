import {Table, Column, Model, DataType} from "sequelize-typescript";

@Table
export class Locker extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  publicKey!: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  privateKey!: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status!: string;
}
