import { sign, SignOptions, verify } from 'jsonwebtoken';

export class Jwt {
   generateToken(id: string, name: string, email: string): string {
    const signInOptions: SignOptions = {
      expiresIn: '7d'
    }

    const token = sign({ 
    id, 
    email, 
    name
    }, process.env.SECRET, signInOptions);
    
    return token
  }

  verifyToken(token: string): boolean {
    const tokenValid = verify(token, process.env.SECRET!)

    return !!tokenValid;
  }
}