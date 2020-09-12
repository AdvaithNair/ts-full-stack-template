"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROLES = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    OWNER: 'OWNER'
};
exports.COOKIE_NAMES = {
    ACCESS: 'at',
    REFRESH: 'rt'
};
exports.TOKEN_DURATIONS = {
    ACCESS: '15m',
    REFRESH: '30d',
    ACCESS_DATE: new Date(Date.now() + 1000 * 60 * 15),
    REFRESH_DATE: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
};
exports.ERRORS = {
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
//# sourceMappingURL=objects.js.map