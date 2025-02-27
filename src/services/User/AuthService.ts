import { getMongoRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../../schemas/User';
import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getMongoRepository(User);

    const user = await userRepository.findOne({
      where: { email }
    });

    if (!user) {
      throw new AppError('Incorrect email / password combination', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect email / password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    });

    return {
      user,
      token
    };
  }
}
