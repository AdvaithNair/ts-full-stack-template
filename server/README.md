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

GET: Returns User's Own User Info.

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

```
/signin
```

POST: Signs In User. Returns User Info and Authentication Token Cookies.

- Parameters
  - Email
  - Password

```
/signout
```

POST: Signs Out User. Returns Success Message.

- Parameters
  - None
