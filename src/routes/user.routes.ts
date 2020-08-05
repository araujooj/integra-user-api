import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ensureAuth from '../middlewares/ensureAuth';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const { name, email, password, addresses } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    addresses
  });

  delete user.password;

  return res.json(user);
});

export default userRouter;
