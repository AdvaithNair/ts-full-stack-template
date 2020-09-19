# API Documentation

## Types

- User
  - id
  - email
  - username
  - firstName
  - lastName
  - imageURL
  - facebook
  - instagram
  - twitter
  - snapchat

## Routes

### /ping

```
/
```

GET: Route for Testing API. Returns "pong!" if done right.

- Returns
  - "pong!"

### /api/users

```
/
```

GET: Returns User's Own User Info.

- Returns
  - User

```
/verify
```

GET: Returns User Info.

- Returns
  - User

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
  - User

```
/signin
```

POST: Signs In User. Returns User Info and Authentication Token Cookies.

- Parameters
  - Email
  - Password
- Returns
  - User

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
  - User

```
/upload-profile-picture
```

POST: Uploads Profile Picture to Server. Returns New Image URL.

- Parameters
  - Image File (Form Data, key = 'profile-picture')
- Returns
  - imageURL

```
/update/social-media
```

PUT: Updates User Social Media. Returns User.

- Parameters
  - provider (Social Media Type: Facebook, Instagram, Twitter, Snapchat)
  - username (Username for designated Social Media)
- Returns
  - User
