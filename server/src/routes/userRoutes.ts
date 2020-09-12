import express from 'express';
import tokenController from '../controllers/tokenController';
import userController from '../controllers/userController';

const userRouter = express.Router();

// Sign Up User (Register)
userRouter.post(
  '/signup',
  userController.createUser,
  tokenController.setTokensEnd
);

// Sign In User (Login)
userRouter.post(
  '/signin',
  userController.verifyUser,
  tokenController.setTokensEnd
);

// Log Out User
userRouter.post(
  '/logout',
  tokenController.validateUser,
  userController.newLogout
);

export default userRouter;
