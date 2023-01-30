import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';
import { ITeams } from '../interfaces/teams.interface';

export default class TeamController {
  public teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const teams: ITeams[] = await this.teamsService.getAllTeams();
    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team: ITeams | null = await this.teamsService.getTeamsById(Number(id));
    return res.status(200).json(team);
  };
}
