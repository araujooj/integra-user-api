import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/User/CreateUserService';
import ensureAuth from '../middlewares/ensureAuth';
import UpdateUserService from '../services/User/UpdateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  const { name, email, password, addresses, cellphone } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    addresses,
    cellphone
  });

  delete user.password;

  return response.json(user);
});

userRouter.use(ensureAuth);

userRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, password, address, cellphone } = request.body;

  const updateUser = new UpdateUserService();

  const user = await updateUser.execute({
    id,
    name,
    password,
    address,
    cellphone
  });

  delete user.password;

  return response.json(user);
});

userRouter.delete('/address/:cep', async (request, response) => {
  const { id } = request.params;
  const { name, password, address, cellphone } = request.body;

  const updateUser = new UpdateUserService();

  const user = await updateUser.execute({
    id,
    name,
    password,
    address,
    cellphone
  });

  delete user.password;

  return response.json(user);
});

export default userRouter;
