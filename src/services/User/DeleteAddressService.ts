import { DeleteResult, getMongoRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../schemas/User';

interface Request {
  user_id: string;
  id: string;
}

class DeleteAddressService {
  public async execute({ user_id, id }: Request): Promise<User> {
    const userRepository = getMongoRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('This uuid is invalid', 401);
    }

    const address = user.addresses.filter(ad => ad.id !== id);

    user.addresses = address;

    await userRepository.save(user);

    return user;
  }
}

export default DeleteAddressService;
