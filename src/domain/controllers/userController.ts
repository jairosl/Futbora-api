import { Bcrypt } from '../../infra/cryptography/bcrypt';
import { User } from '../../infra/database/mongo/models/user';
import { ApplicationError } from '../errors/CustomError';
import { UserDtoInput } from './../dtos/userDto';


export class UserController {
  private encrypt: Bcrypt;
  
  constructor() {
    this.encrypt = new Bcrypt();
  }

  async create({ email, password, name }: UserDtoInput) {
    const userAlreadyExist = await User.findOne({ email })

    if(userAlreadyExist) {
      return new ApplicationError('user already exists', 400);
    }

    const hash_password = await this.encrypt.encrypt(password);

    try {

      const user = await User.create({ 
        email,
        hash_password,
        name
       });

      return {
        id: user._id,
        name: user.name,
        email: user.email,
      };
    }catch (e) {
      return new ApplicationError('Error saving to database', 500);
    }
    

  }
}