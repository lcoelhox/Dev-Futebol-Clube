import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import ValidateMatches from '../middlewares/matches.validate';
import ValidateLogin from '../middlewares/login.validate';

const router = express.Router();
const matchController = new MatchesController();
const validateLogin = new ValidateLogin();
const validateMatches = new ValidateMatches();

router.post(
  '/',
  validateMatches.validationIdenticalTeams,
  validateMatches.validationExistTeams,
  validateLogin.validateToken,
  matchController.createNewMatch,
);

router.get('/', matchController.getAll);

router.patch('/:id/finish', matchController.finishMatch);

router.patch('/:id', matchController.editedMatch);

export default router;
