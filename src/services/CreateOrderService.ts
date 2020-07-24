// import AppError from '../errors/AppError';

import { getMongoRepository } from 'typeorm';
import Order from '../schemas/Order';

interface Request {
  username: string;
  address?: string;
  products: Product[];
  withdrawl: boolean;
  subtotal: number;
}

class CreateOrderService {
  public async execute({
    username,
    address,
    products,
    withdrawl,
    subtotal
  }: Request): Promise<Order> {
    const orderRepository = getMongoRepository(Order);

    const order = orderRepository.create({
      username,
      address,
      products,
      withdrawl,
      subtotal
    });

    await orderRepository.save(order);

    return order;
  }
}

export default CreateOrderService;
