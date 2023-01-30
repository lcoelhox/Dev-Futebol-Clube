import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/users.interface';
import IUserJWT from '../interfaces/jwt.interfaces';

dotenv.config();

export default class JwtToken {
  private jwtConfig: object;
  private secret: string;
  constructor() {
    this.jwtConfig = {
      algorithm: 'HS256',
      expiresIn: '7h',
    };
    this.secret = process.env.JWT_SECRET || 'jwt_secret';
  }

  public generateToken = (user: IUser): string => {
    const token = jwt.sign({ data: user }, this.secret, this.jwtConfig);

    return token;
  };

  public verifyToken = (token: string): object => {
    try {
      const payload = jwt.verify(token, this.secret) as IUserJWT;
      // console.log(payload)
      return payload;
    } catch (error) {
      return { error: 'Token must be a valid token' } as IUserJWT;
    }
  };
}
