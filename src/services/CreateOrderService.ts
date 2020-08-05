// import AppError from '../errors/AppError';

import { getMongoRepository } from 'typeorm';
import Order from '../schemas/Order';

interface Request {
  user_id: string;
  address?: string;
  products: Product[];
  withdrawl: boolean;
  subtotal: number;
  totalItens: number;
  paymentMethod: string;
}

class CreateOrderService {
  public async execute({
    user_id,
    address,
    products,
    withdrawl,
    subtotal,
    totalItens,
    paymentMethod
  }: Request): Promise<Order> {
    const orderRepository = getMongoRepository(Order);

    const order = orderRepository.create({
      user_id,
      address,
      products,
      withdrawl,
      subtotal,
      totalItens,
      paymentMethod
    });

    await orderRepository.save(order);

    return order;
  }
}

export default CreateOrderService;
