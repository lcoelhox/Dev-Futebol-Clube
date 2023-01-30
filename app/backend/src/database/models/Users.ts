import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },

  username: {
    type: STRING,
    allowNull: false,
  },

  role: {
    type: STRING,
    allowNull: false,
  },

  email: {
    type: STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: STRING,
    allowNull: false,
  },

}, {
  modelName: 'users',
  timestamps: false,
  underscored: true,
  sequelize: db,
});

export default Users;
