import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = express.Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', leaderboardController.getHome);

leaderboardRouter.get('/away', leaderboardController.getAway);

leaderboardRouter.get('/', leaderboardController.getLB);

export default leaderboardRouter;
