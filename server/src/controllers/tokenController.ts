import { Request, Response, NextFunction } from 'express';
import { TOKEN_DURATIONS, COOKIE_NAMES, JWT_CRYPTO, ERRORS } from '@app/common';
import { verify, sign } from 'jsonwebtoken';
import User from '../entities/user';

const errorMessage = {
  error: ERRORS.AUTH.UNAUTHORIZED
};

// Creates and Sets Tokens in Cookies
const setTokens = (res: Response, id: number, count: number) => {
  // Creates Tokens
  const refresh = sign({ id, count }, JWT_CRYPTO.REFRESH, {
    expiresIn: TOKEN_DURATIONS.REFRESH
  });
  const access = sign({ id }, JWT_CRYPTO.ACCESS, {
    expiresIn: TOKEN_DURATIONS.ACCESS
  });

  // Sets Cookies
  res.cookie(COOKIE_NAMES.REFRESH, refresh, {
    expires: TOKEN_DURATIONS.REFRESH_DATE,
    httpOnly: true
  });
  res.cookie(COOKIE_NAMES.ACCESS, access, {
    expires: TOKEN_DURATIONS.ACCESS_DATE,
    httpOnly: true
  });
};

// Verifies Access Token Easily
const verifyAccess = (accessToken: string) => {
  return verify(accessToken, JWT_CRYPTO.ACCESS);
};

// Verifies Refresh Token Easily
const verifyRefresh = (refreshToken: string) => {
  return verify(refreshToken, JWT_CRYPTO.REFRESH);
};

// Endware to set tokens and return user
export const setTokensEnd = (_req: Request, res: Response, _next: NextFunction) => {
  const { payload } = res.locals;

  try {
    // Sets Tokens
    setTokens(res, payload.id, payload.count);

    // Set Payload
    delete payload.count;
    delete payload.role;

    return res.status(200).json(payload);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      errMsg: 'Unable to Authenticate User'
    });
  }
};

// Middleware to validate user
export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get Tokens from Cookies or Headers
  const refreshToken = req.cookies[COOKIE_NAMES.REFRESH];
  const accessToken = req.cookies[COOKIE_NAMES.ACCESS];

  // If no tokens, proceed
  if (!accessToken && !refreshToken)
    return res.status(401).json({
      error: ERRORS.AUTH.NOT_LOGGED_IN
    });

  // Validate Access Token
  if (accessToken) {
    try {
      const accessData: any = verifyAccess(accessToken);
      res.locals = {
        ...res.locals,
        payload: { ...res.locals.payload, id: accessData.id }
      };
      return next();
    } catch {}
  }

  // If no refresh token, return error
  if (!refreshToken) return res.status(401).json(errorMessage);

  // Validate Refresh Token
  let refreshData: any;
  try {
    refreshData = verifyRefresh(refreshToken);
  } catch {
    return res.status(401).json(errorMessage);
  }

  // Validate Count Checking
  const user = await User.findOne(refreshData.id);
  if (!user || user.count !== refreshData.count) {
    return res.status(401).json({
      error: ERRORS.AUTH.LOG_BACK_IN
    });
  }

  // Sets Tokens
  setTokens(res, user.id, user.count);

  delete user.password;
  delete user.count;
  delete user.role;
  res.locals = { ...res.locals, payload: user };

  next();
};