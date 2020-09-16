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
  ACCESS_DATE: new Date(Date.now() + 1000 * 60 * 15),
  REFRESH_DATE: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
};

export const ERRORS = {
  GENERAL: {
    EMAIL: 'Must Be A Valid Email Address',
    BLANK: 'Must Not Be Empty',
    PASSWORD_SHORT: 'Must Be At Least 6 Characters',
    INVALID: 'Invalid Credentials'
  },
  AUTH: {
    NOT_LOGGED_IN: 'Unauthorized: Not Logged In',
    UNAUTHORIZED: 'Unauthorized',
    LOG_BACK_IN: 'Unauthorized: Log Back In',
    USER_NOT_FOUND: 'User Not Found'
  },
  SIGNUP: {
    EMAIL_USERNAME_IN_USE: 'Email or Username Already In Use',
    UNABLE: 'Unable To Sign Up User',
    USERNAME_SHORT: 'Username Too Short',
    USERNAME_LONG: 'Username Too Long'
  },
  SIGNIN: {
    USER_NONEXISTENT: 'User Does Not Exist'
  },
  LOGOUT: {
    SUCCESS: 'Successfully Logged Out',
    USER_UNAVAILABLE: 'User Not Available'
  }
};

export const COLORS = {
  PRIMARY: '#5A0073',
  SECONDARY: '#000081',
  BUBBLY_START: '#5A0073',
  BUBBLY_STOP: '#000081'
};

export const LOCALSTORAGE = {
  USER: 'userData'
};
