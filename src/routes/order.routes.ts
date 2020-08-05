import { Router } from 'express';
import { getMongoRepository } from 'typeorm';
import Order from '../schemas/Order';
import CreateOrderService from '../services/CreateOrderService';
import ensureAuth from '../middlewares/ensureAuth';
import UpdateStatusOrderService from '../services/UpdateStatusOrderService';

const orderRouter = Router();

orderRouter.get('/:market_id', async (request, response) => {
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
    address,
    products,
    withdrawl,
    subtotal,
    totalItens,
    paymentMethod,
    market_id
  } = request.body;

  const createOrder = new CreateOrderService();

  await createOrder.execute({
    user_id: request.user.id,
    address,
    products,
    withdrawl,
    subtotal,
    totalItens,
    paymentMethod,
    status: 'Pedido Recebido',
    market_id
  });

  return response.status(204).json();
});

export default orderRouter;
