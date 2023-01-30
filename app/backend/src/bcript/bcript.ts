import * as bcript from 'bcryptjs';

export default class Bcript {
  private encript: number;

  constructor() {
    this.encript = 8;
  }

  public decrypting = async (password: string, databasePassword: string): Promise<boolean> => {
    const validate = await bcript.compare(password, databasePassword);

    return validate;
  };
}
