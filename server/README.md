# API Documentation

## Routes

### /ping

```
/
```

GET: Route for Testing API. Returns "pong!" if done right.

### /api/users

```
/
```

- Returns
  - id
  - email
  - username
  - firstName
  - lastName

GET: Returns User's Own User Info.

```
/verify
```

- Returns
  - id

GET: Returns User's ID for less load and to cross-check with id from localStorage.

```
/signup
```

POST: Signs Up and Creates User. Returns User Info and Authentication Token Cookies.

- Parameters
  - Email
  - Password
  - Username
  - First Name
  - Last Name
- Returns
  - id
  - email
  - username
  - firstName
  - lastName

```
/signin
```

POST: Signs In User. Returns User Info and Authentication Token Cookies.

- Parameters
  - Email
  - Password
- Returns
  - id
  - email
  - username
  - firstName
  - lastName

```
/signout
```

POST: Signs Out User. Returns Success Message.

- Parameters
  - None
- Returns
  - message
