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
  - imageURL

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
  - imageURL

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
  - imageURL

```
/signout
```

POST: Signs Out User. Returns Success Message.

- Parameters
  - None
- Returns
  - message

```
/update
```

PUT: Updates User Info. Returns Updated User Info.

- Parameters
  - email
  - username
  - firstName
  - lastName
- Returns
  - id
  - email
  - username
  - firstName
  - lastName
  - imageURL

```
/upload-profile-picture
```

POST: Uploads Profile Picture to Server. Returns New Image URL.

- Parameters
  - Image File (Form Data, key = 'profile-picture')
- Returns
  - imageURL