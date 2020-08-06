/* eslint-disable no-unused-expressions */
import { getMongoRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../schemas/User';
import BCryptHashProvider from '../../providers/HashProvider/BCryptHashProvider';

interface Request {
  id: string;
  name: string;
  old_password?: string;
  password?: string;
  address: Address;
  cellphone: string;
}

export default class UpdateUserService {
  public async execute({
    id,
    name,
    password,
    old_password,
    address,
    cellphone
  }: Request): Promise<User> {
    const userRepository = getMongoRepository(User);
    const hashProvider = new BCryptHashProvider();

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('Invalid object uuid', 401);
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password'
      );
    }

    if (password && old_password) {
      const checkOldPassword = await hashProvider.compareHash(
        old_password,
        user.password
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await hashProvider.generateHash(password);
    }

    name ? (user.name = name) : user.name;

    address ? user.addresses.push(address) : user.addresses;

    cellphone ? (user.cellphone = cellphone) : user.cellphone;

    await userRepository.save(user);

    return user;
  }
}
