import { DeleteResult, getMongoRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../schemas/User';

interface Request extends Address {
  user_id: string;
  id: string;
}

class UpdateAddressService {
  public async execute({
    user_id,
    id,
    name,
    active,
    cep,
    neighbourhood,
    number,
    street
  }: Request): Promise<Address> {
    const userRepository = getMongoRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('This uuid is invalid', 401);
    }

    let address = user.addresses.filter(ad => ad.id === id);

    const updatedAddress = {
      id,
      name: name ? name : address[0].name,
      active: active ? active : address[0].active,
      cep: cep ? cep : address[0].cep,
      neighbourhood: neighbourhood ? neighbourhood : address[0].neighbourhood,
      number: number ? number : address[0].number,
      street: street ? street : address[0].street
    };

    const index = user.addresses.indexOf(address[0]);

    user.addresses.splice(index);

    address[0] = updatedAddress;

    user.addresses.push(address[0]);

    await userRepository.save(user);

    return address[0];
  }
}

export default UpdateAddressService;
