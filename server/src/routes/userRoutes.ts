import express from 'express';
import * as tokenController from '../controllers/tokenController';
import * as userController from '../controllers/userController';

const userRouter = express.Router();

// Gets Own User Info (TODO)
userRouter.get('/', tokenController.validateUser, userController.getOwnInfo);

// Verify User
userRouter.get(
  '/verify',
  tokenController.validateUser,
  userController.verifyUser
);

// Sign Up User (Register)
userRouter.post('/signup', userController.signup, tokenController.setTokensEnd);

// Sign In User (Login)
userRouter.post('/signin', userController.signin, tokenController.setTokensEnd);

// Log Out User
userRouter.post(
  '/signout',
  tokenController.validateUser,
  userController.signout
);

export default userRouter;
