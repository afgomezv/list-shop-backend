import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import List from "./List";

@Table({
  tableName: "products",
  timestamps: true,
})
class Product extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(30),
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare price: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare stock: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare isBuy: boolean;

  @ForeignKey(() => List)
  declare listId: number;

  @BelongsTo(() => List)
  declare list: List;
}

export default Product;
