import { Router } from 'express';
import CreateUserService from '../services/User/CreateUserService';
import ensureAuth from '../middlewares/ensureAuth';
import UpdateUserService from '../services/User/UpdateUserService';
import DeleteAddressService from '../services/User/DeleteAddressService';
import UpdateAddressService from '../services/User/UpdateAddressService';

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

userRouter.put('/', async (request, response) => {
  const { name, password, address, cellphone } = request.body;

  const updateUser = new UpdateUserService();

  const user = await updateUser.execute({
    id: request.user.id,
    name,
    password,
    address,
    cellphone
  });

  delete user.password;

  return response.json(user);
});

userRouter.put('/address/:id', async (request, response) => {
  const { id } = request.params;
  const { name, active, cep, neighbourhood, number, street } = request.body;

  const updateAddress = new UpdateAddressService();

  const address = await updateAddress.execute({
    user_id: request.user.id,
    id,
    name,
    active,
    cep,
    neighbourhood,
    number,
    street
  });

  return response.json(address);
});

userRouter.delete('/address/:id', async (request, response) => {
  const { id } = request.params;
  const deleteAddress = new DeleteAddressService();

  const user = await deleteAddress.execute({
    user_id: request.user.id,
    id
  });

  delete user.password;

  return response.json(user);
});

export default userRouter;
