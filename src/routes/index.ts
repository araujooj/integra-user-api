import { Router } from 'express';
import orderRouter from './order.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/orders', orderRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
