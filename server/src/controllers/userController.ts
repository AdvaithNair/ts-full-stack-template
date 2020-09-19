import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT, ERRORS, COOKIE_NAMES, BUCKET_URL } from '@app/common';
import User from '../entities/user';
import { getConnection } from 'typeorm';

const checkCreds = async (res: Response, email: string) => {
  try {
    // Gets User by Email
    const user = await User.findOne({ email });

    if (!user)
      return {
        payload: {},
        password: '',
        exists: false
      };

    const hash = user!.password;
    delete user!.password;

    return {
      payload: user,
      password: hash,
      exists: Boolean(user)
    };
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: ERRORS.GENERAL.INVALID
    });
  }
};

// Signup Route
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email, firstName, lastName } = req.body;

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
      username,
      firstName,
      lastName
    }).save();
    delete user.password;

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
export const signin = async (
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
        error: ERRORS.GENERAL.INVALID
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
      error: ERRORS.GENERAL.INVALID
    });
  }
};

// Sign Out Route
export const signout = async (_req: Request, res: Response) => {
  try {
    // Throws Error if User isn't in Payload (logged in)
    if (!res.locals.payload.id) throw new Error();

    // Updates Count
    getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ count: () => 'count + 1' })
      .where('id = :id', { id: res.locals.payload.id })
      .execute();

    // Clears Cookies
    res.clearCookie(COOKIE_NAMES.REFRESH);
    res.clearCookie(COOKIE_NAMES.ACCESS);

    res.json({
      message: 'Successfully Logged Out'
    });
  } catch (error) {
    res.status(401).json({
      error: ERRORS.LOGOUT.USER_UNAVAILABLE
    });
  }
};

// Updates User Info
export const updateUser = async (req: Request, res: Response) => {
  try {
    // Query User
    const { id } = res.locals.payload;

    // Filter Parameters
    Object.keys(req.body).forEach(key => {
      req.body[key] == '' && delete req.body[key];
    });

    // Save User
    await User.save({ ...req.body, id });
    const user = await User.findOne(id);

    res.json(user);
  } catch {
    res.status(400).json({
      error: ERRORS.UPDATE_USER.UNABLE
    });
  }
};

// Gets Own User
export const getOwnInfo = async (_req: Request, res: Response) => {
  try {
    // Gets User
    const user = await User.findOne(res.locals.payload.id);

    // Removes Secrets
    delete user!.password;
    delete user!.role;
    delete user!.count;

    res.json(user);
  } catch (error) {
    res.status(400).json({
      error: ERRORS.AUTH.USER_NOT_FOUND
    });
  }
};

// Verification Message Sent
/* export const verifyUser = async (_req: Request, res: Response) => {
  try {
    const { id } = res.locals.payload;

    // Get User Data
    const user = await User.findOne(id);
    if (!user) throw new Error();
    delete user.password;
    delete user.count;
    delete user.role;

    res.json(user);
  } catch {
    res.status(400).json({
      id: -1
    });
  }
}; */

// Upload Image
export const uploadProfilePicture = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.payload;

    // Get File
    const file = req.file;
    if (!file) throw new Error();

    // Remove Username from Request Object
    delete (req as any).username;

    // Sets New Image URL
    const imageURL = `${BUCKET_URL}/uploads/profile-pictures/${file.filename}`;
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        imageURL
      })
      .where('id = :id', { id })
      .execute();

    res.json({
      imageURL
    });
  } catch {
    res.status(400).json({
      error: ERRORS.FILE_UPLOAD.NO_FILE
    });
  }
};

// Link Social Media
export const linkSocialMedia = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.payload;
    const { provider, username } = req.body;

    const user = await User.findOne(id);
    if (!user) throw new Error();

    // Set URL
    if (provider == 'Facebook')
      user.facebook = `https://facebook.com/${username}`;
    else if (provider == 'Instagram')
      user.instagram = `https://instagram.com/${username}`;
    else if (provider == 'Twitter')
      user.twitter = `https://twitter.com/${username}`;
    else if (provider == 'Snapchat')
      user.snapchat = `https://snapchat.com/add/${username}`;
    user.save();

    // Filter Output
    delete user.password;
    delete user.count;
    delete user.role;

    res.json(user);
  } catch {
    res.status(400).json({
      error: ERRORS.UPDATE_USER.SOCIAL_MEDIA
    });
  }
};
