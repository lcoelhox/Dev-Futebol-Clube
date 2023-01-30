import * as express from 'express';
import LoginController from '../controllers/login.controller';
import ValidateLogin from '../middlewares/login.validate';

const router = express.Router();
const validateLogin = new ValidateLogin();
const loginController = new LoginController();

router.post(
  '/',
  validateLogin.validateLoginUser,
  validateLogin.validatePasswordEmail,
  loginController.login,
);

router.get(
  '/validate',
  validateLogin.validateToken,
  loginController.getUserType,
);

export default router;
