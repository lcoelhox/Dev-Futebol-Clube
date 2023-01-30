import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  public getHome = async (_req: Request, res: Response): Promise<void> => {
    const result = await LeaderboardService.getLeaderboardComplete(true);
    // console.log(result);
    res.status(200).json(result);
  };

  public getAway = async (_req: Request, res: Response): Promise<void> => {
    const result = await LeaderboardService.getLeaderboardComplete(false);
    // console.log(result);
    res.status(200).json(result);
  };

  public getLB = async (_req: Request, res: Response): Promise<void> => {
    const result = await LeaderboardService.getLeaderboardComplete();
    console.log(result);
    res.status(200).json(result);
  };
}
