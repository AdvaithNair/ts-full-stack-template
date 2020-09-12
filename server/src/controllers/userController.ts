import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT, ERRORS, COOKIE_NAMES } from '@app/common';
import User from '../entities/user';
import { getConnection } from 'typeorm';

const userController: { [k: string]: any } = {};

const checkCreds = async (res: Response, email: string) => {
  try {
    // Gets User by Email
    const user = await User.findOne({ email });

    // Exits if User Does Not Exist
    if (!user) throw new Error();

    const hash = user.password;

    delete user.password;

    return {
      payload: user,
      password: hash,
      exists: Boolean(user)
    };
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: ERRORS.SIGNIN.INVALID
    });
  }
};

// Signup Route
userController.signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;

  try {
    // Checks if User Exists
    const userExists = await checkCreds(res, email);
    if ((userExists as any).exists) {
      return res.status(400).json({
        error: ERRORS.SIGNUP.EMAIL_USERNAME_IN_USE
      });
    }

    // Hashes Password
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);

    // Inserts User
    const user = await User.create({
      email,
      password: hashedPassword,
      username
    }).save();

    // Sets Payload of res.locals
    res.locals = {
      ...res.locals,
      payload: user
    };

    // Proceeds
    return next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: ERRORS.SIGNUP.UNABLE
    });
  }
};

// Signin Route
userController.signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    // Gets User from Credentials
    const user = await checkCreds(res, email);
    if (!(user as any).exists) {
      return res.status(400).json({
        error: ERRORS.SIGNIN.USER_NONEXISTENT
      });
    }

    // Validates Password
    const isPasswordValid = await bcrypt.compare(
      password,
      (user as any).password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        error: ERRORS.SIGNIN.INVALID
      });
    }

    res.locals = {
      ...res.locals,
      payload: (user as any).payload
    };

    return next();
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: ERRORS.SIGNIN.INVALID
    });
  }
};

// Logout Route
userController.logout = async (_req: Request, res: Response) => {
  try {
    // Throws Error if User isn't in Payload (logged in)
    if (!res.locals.payload.id) throw new Error();

    // Updates Count
    getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ count: () => 'count + 1' })
      .execute();

    // Clears Cookies
    res.clearCookie(COOKIE_NAMES.REFRESH);
    res.clearCookie(COOKIE_NAMES.ACCESS);

    res.send({
      message: 'Successfully Logged Out'
    });
  } catch (error) {
    res.status(401).json({
      error: ERRORS.LOGOUT.USER_UNAVAILABLE
    });
  }
};

export default userController;