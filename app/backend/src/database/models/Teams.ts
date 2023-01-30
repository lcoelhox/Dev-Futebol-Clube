import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Matches from './Matches';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  modelName: 'teams',
  timestamps: false,
  underscored: true,
  sequelize: db,
});

Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Teams;
