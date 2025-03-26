import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import List from "./List";

@Table({
  tableName: "users",
})
class User extends Model {
  @Unique(true)
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare password: string;

  @HasMany(() => List, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  declare lists: List[];
}

export default User;
