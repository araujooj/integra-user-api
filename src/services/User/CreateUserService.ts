import { getMongoRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../../schemas/User';
import AppError from '../../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  addresses: Address[];
  cellphone: string;
}

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
    addresses,
    cellphone
  }: Request): Promise<User> {
    const userRepository = getMongoRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email }
    });

    if (checkUserExists) {
      throw new AppError('Email already exists', 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      addresses,
      cellphone
    });

    await userRepository.save(user);

    return user;
  }
}
