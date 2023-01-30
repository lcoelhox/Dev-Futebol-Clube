import { Request, Response } from 'express';
import IUserJWT from '../interfaces/jwt.interfaces';
import JwtToken from '../auth/JWT';

export default class Login {
  private jwtToken: JwtToken;

  constructor() {
    this.jwtToken = new JwtToken();
  }

  public login = async (req: Request, res: Response) => {
    const { user } = req.body;
    return res.status(200).json({ token: this.jwtToken.generateToken(user) });
  };

  public getUserType = async (req: Request, res: Response) => {
    const { headers: { authorization = '' } = {} } = req;
    // const { data } = this.jwtToken.verifyToken(authorization) as IUserJWT;
    // console.log(data)
    const { data: { role } } = this.jwtToken.verifyToken(authorization) as IUserJWT;

    return res.status(200).json({ role });
  };
}
