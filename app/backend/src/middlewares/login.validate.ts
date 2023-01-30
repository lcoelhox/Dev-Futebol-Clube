import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import Bcript from '../bcript/bcript';
import { IUser } from '../interfaces/users.interface';
import JwtToken from '../auth/JWT';
import IPayloadUserJWT from '../interfaces/jwt.interfaces';

export default class ValidateLogin {
  private jwtToken: JwtToken;
  private userService: UserService;
  private bcript: Bcript;

  constructor() {
    this.jwtToken = new JwtToken();
    this.userService = new UserService();
    this.bcript = new Bcript();
  }

  public validateLoginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const user: IUser | null = await this.userService.getUserByEmail(email) as IUser;
    // console.log(user);
    const passwordValidate = await this.bcript.decrypting(password, user?.password ?? 'null');
    if (!user || !passwordValidate) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    req.body.user = user;

    return next();
  };

  public validatePasswordEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    return next();
  };

  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'authentication token required' });
    }

    const response = this.jwtToken.verifyToken(authorization) as IPayloadUserJWT;
    if (response.error) {
      return res.status(401).json({ message: response.error });
    }

    return next();
  };
}
