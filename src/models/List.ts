import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import Product from "./Product";
import User from "./User";

@Table({
  tableName: "lists",
  timestamps: true,
})
class List extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(30),
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare description: string;

  @HasMany(() => Product, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  declare products: Product[];

  @ForeignKey(() => User)
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;
}

export default List;
