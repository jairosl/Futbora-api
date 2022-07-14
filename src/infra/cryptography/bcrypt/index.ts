import bcrypt from "bcrypt";

export class Bcrypt {
  async encrypt(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  async decrypt(password: string, hash: string): Promise<boolean> {
    const isMatch = bcrypt.compareSync(password, hash);
    return isMatch;
  }
}