import { LoginDto, loginDtoOut } from "../../domain/dtos/loginDto";
import { ApplicationError } from "../../domain/errors/CustomError";
import { Bcrypt } from "../../infra/cryptography/bcrypt";
import { Jwt } from "../../infra/security/jwt";
import { User } from '../../infra/database/mongo/models/user';

export class LoginController {
  private encrypt: Bcrypt;
  private tokenGenerator: Jwt;
  
  constructor() {
    this.encrypt = new Bcrypt();
    this.tokenGenerator = new Jwt();
  }

  async create({ email, password }: LoginDto): Promise<loginDtoOut>{
    const user = await User.findOne({ email });

    if(!user) {
      throw new ApplicationError("User not exists", 404);
    }

    const isMatchPassword = await this.encrypt.decrypt(password, user.hash_password)

    if (!isMatchPassword) {
      throw new ApplicationError("Email or Password mismatch", 400);
    }
    
    const token = this.tokenGenerator
      .generateToken(user.id, user.name, user.email);
    
    if (!token) {
      throw new ApplicationError("Error Generate token", 500);
    }

    return { token };
  }
}