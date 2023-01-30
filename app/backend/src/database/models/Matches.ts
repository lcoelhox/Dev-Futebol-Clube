import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },

  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },

}, {
  modelName: 'matches',
  timestamps: false,
  underscored: true,
  sequelize: db,
});

export default Matches;
