import { Router } from 'express';
import { getMongoRepository } from 'typeorm';
import Order from '../schemas/Order';
import CreateOrderService from '../services/CreateOrderService';

const orderRouter = Router();

orderRouter.get('/', async (request, response) => {
  const OrderRepository = getMongoRepository(Order);

  const orders = await OrderRepository.find();

  return response.json(orders);
});

orderRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const OrderRepository = getMongoRepository(Order);

  const orders = await OrderRepository.findOne(id);

  return response.json(orders);
});

orderRouter.post('/', async (request, response) => {
  const {
    username,
    address,
    products,
    withdrawl,
    subtotal,
    totalItens
  } = request.body;

  const createOrder = new CreateOrderService();

  createOrder.execute({
    username,
    address,
    products,
    withdrawl,
    subtotal,
    totalItens
  });

  return response.status(204).json();
});

export default orderRouter;
