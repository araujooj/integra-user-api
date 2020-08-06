import { Router } from 'express';
import { getMongoRepository, getRepository } from 'typeorm';
import Order from '../schemas/Order';
import CreateOrderService from '../services/Order/CreateOrderService';
import ensureAuth from '../middlewares/ensureAuth';
import UpdateStatusOrderService from '../services/Order/UpdateStatusOrderService';
import User from '../schemas/User';
import AppError from '../errors/AppError';

const orderRouter = Router();

orderRouter.get('/markets/:market_id', async (request, response) => {
  const { market_id } = request.params;
  const OrderRepository = getMongoRepository(Order);

  const orders = await OrderRepository.find({
    where: {
      market_id
    }
  });

  return response.json(orders);
});

orderRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const OrderRepository = getMongoRepository(Order);

  const orders = await OrderRepository.findOne(id);

  return response.json(orders);
});

orderRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { status } = request.body;

  const updateOrder = new UpdateStatusOrderService();

  await updateOrder.execute({
    id,
    status
  });

  return response.json(updateOrder);
});

orderRouter.use(ensureAuth);

orderRouter.get('/', async (request, response) => {
  const OrderRepository = getMongoRepository(Order);

  const orders = await OrderRepository.find({
    where: {
      user_id: request.user.id
    }
  });

  return response.json(orders);
});

orderRouter.post('/', async (request, response) => {
  const {
    products,
    withdrawl,
    subtotal,
    totalItens,
    paymentMethod,
    market_id
  } = request.body;

  const userRepository = getMongoRepository(User);

  const user = await userRepository.findOne(request.user.id);

  if (!user) {
    throw new AppError('Inform a real user');
  }

  const userAddress = user.addresses.filter(ad => ad.active === true);

  const createOrder = new CreateOrderService();

  const order = await createOrder.execute({
    user_id: request.user.id,
    address: userAddress[0],
    products,
    withdrawl,
    subtotal,
    totalItens,
    paymentMethod,
    status: 'Pedido Recebido',
    market_id
  });

  return response.json(order);
});

export default orderRouter;
