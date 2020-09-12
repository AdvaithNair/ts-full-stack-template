import express from 'express';
import * as tokenController from '../controllers/tokenController';
import * as userController from '../controllers/userController';

const userRouter = express.Router();

// Sign Up User (Register)
userRouter.get('/', (_req, res) => res.send('user'));
userRouter.post(
  '/signup',
  userController.signup,
  tokenController.setTokensEnd
);

// Sign In User (Login)
userRouter.post(
  '/signin',
  userController.signin,
  tokenController.setTokensEnd
);

// Log Out User
userRouter.post(
  '/logout',
  tokenController.validateUser,
  userController.logout
);

export default userRouter;
