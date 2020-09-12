const oneDay: number = 1000 * 60 * 60 * 24;
const oneMinute: number = 1000 * 60;

export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  OWNER: 'OWNER'
};

export const COOKIE_NAMES = {
  ACCESS: 'at',
  REFRESH: 'rt'
};

export const TOKEN_DURATIONS = {
  ACCESS: '15m',
  REFRESH: '30d',
  ACCESS_DATE: new Date(Date.now() + oneMinute * 15),
  REFRESH_DATE: new Date(Date.now() + oneDay * 30)
};

export const ERRORS = {
  AUTH: {
    NOT_LOGGED_IN: 'Unauthorized: Not Logged In',
    UNAUTHORIZED: 'Unauthorized',
    LOG_BACK_IN: 'Unauthorized: Log Back In'
  },
  SIGNUP: {
    EMAIL_USERNAME_IN_USE: 'Email or Username Already In Use',
    UNABLE: 'Unable To Sign Up User'
  },
  SIGNIN: {
    INVALID: 'Invalid Credentials',
    USER_NONEXISTENT: 'User Does Not Exist'
  },
  LOGOUT: {
    SUCCESS: 'Successfully Logged Out',
    USER_UNAVAILABLE: 'User Not Available'
  }
};
