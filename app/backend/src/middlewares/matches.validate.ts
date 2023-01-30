import { Request, Response, NextFunction } from 'express';
// import MatchesService from '../services/matches.service';
import TeamsService from '../services/teams.service';

export default class ValidadeMatch {
  // private matchesService: MatchesService;
  private teamsService: TeamsService;

  constructor() {
    // this.matchesService = new MatchesService();
    this.teamsService = new TeamsService();
  }

  public validationIdenticalTeams = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    return next();
  };

  public validationExistTeams = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId } = req.body;

    const homeTeam = await this.teamsService.getTeamsById(homeTeamId);
    const awayTeam = await this.teamsService.getTeamsById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    return next();
  };
}
