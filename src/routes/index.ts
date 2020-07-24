import { Router } from 'express';
import orderRouter from './order.routes';

const routes = Router();

routes.use('/orders', orderRouter);

export default routes;
