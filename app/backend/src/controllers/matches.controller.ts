import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;

    const matches = await MatchesService.getAllMatches();

    const matchesFiltered = matches.filter((mact) => inProgress === undefined || mact
      .inProgress.toString() === inProgress);

    res.status(200).json(matchesFiltered);
  };

  public createNewMatch = async (req: Request, res: Response) => {
    const dados = req.body;
    const match = await this.matchesService.createMatch(dados);

    return res.status(201).json(match);
  };

  public finishMatch = async (req: Request, res: Response): Promise<void | Response> => {
    const { id } = req.params;

    await this.matchesService.finishMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };

  public editedMatch = async (req: Request, res: Response): Promise<void | Response> => {
    const { id } = req.params;
    const match = req.body;

    await this.matchesService.editedMatch(Number(id), match);

    return res.status(200).json({ message: 'Edited' });
  };
}
