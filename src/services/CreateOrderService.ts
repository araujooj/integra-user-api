// import AppError from '../errors/AppError';

import { getMongoRepository } from 'typeorm';
import Order from '../schemas/Order';

interface Request {
  user_id: string;
  address?: Address;
  products: Product[];
  withdrawl: boolean;
  subtotal: number;
  totalItens: number;
  paymentMethod: string;
  status: string;
  market_id: string;
}

class CreateOrderService {
  public async execute({
    user_id,
    address,
    products,
    withdrawl,
    subtotal,
    totalItens,
    paymentMethod,
    status,
    market_id
  }: Request): Promise<Order> {
    const orderRepository = getMongoRepository(Order);

    const order = orderRepository.create({
      user_id,
      address,
      products,
      withdrawl,
      subtotal,
      totalItens,
      paymentMethod,
      status,
      market_id
    });

    await orderRepository.save(order);

    return order;
  }
}

export default CreateOrderService;
