import { EntityRepository, Repository } from 'typeorm';
import Order from '../schemas/Order';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  public async getBalance(): Promise<Balance> {
    // TODO
  }
}

export default OrdersRepository;
