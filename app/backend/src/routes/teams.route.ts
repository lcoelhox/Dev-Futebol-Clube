import * as express from 'express';
import TeamsController from '../controllers/teams.controller';

const router = express.Router();

const teamsController = new TeamsController();

router.get('/', teamsController.getAll);

router.get('/:id', teamsController.getById);

export default router;
