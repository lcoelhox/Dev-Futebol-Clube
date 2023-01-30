import User from '../database/models/Users';
import { IUser } from '../interfaces/users.interface';

export default class UserService {
  public getUserByEmail = async (email: string): Promise<IUser | null> => {
    const user: IUser | null = await User.findOne({ where: { email } });

    return user;
  };
}
