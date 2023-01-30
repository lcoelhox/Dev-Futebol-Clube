import Teams from '../database/models/Teams';
import { ITeams } from '../interfaces/teams.interface';

export default class TeamsService {
  public getAllTeams = async (): Promise<ITeams[]> => {
    const teams = await Teams.findAll();

    return teams;
  };

  public getTeamsById = async (id: number): Promise<ITeams | null> => {
    const team: ITeams | null = await Teams.findByPk(id);

    return team;
  };
}
