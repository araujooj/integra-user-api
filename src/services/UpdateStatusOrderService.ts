/* eslint-disable no-unused-expressions */
import { getMongoRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Order from '../schemas/Order';

interface Request {
  id: string;
  status: string;
}

export default class UpdateStatusOrderService {
  public async execute({ id, status }: Request): Promise<Order> {
    const orderRepository = getMongoRepository(Order);
    const newOrder = await orderRepository.findOne(id);

    if (!newOrder) {
      throw new AppError('Invalid object uuid', 401);
    }

    newOrder.status = status;

    await orderRepository.save(newOrder);

    return newOrder;
  }
}
