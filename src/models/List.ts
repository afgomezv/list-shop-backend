import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import Product from "./Product";

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
}

export default List;
