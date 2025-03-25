import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "lists",
  timestamps: true,
})
class List extends Model {
  @Column({
    type: DataType.STRING(30),
  })
  declare name: string;

  @Column({
    type: DataType.STRING(100),
  })
  declare description: string;
}

export default List;
