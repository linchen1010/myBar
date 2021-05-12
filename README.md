# myBar

## Description

myBar is a MERN stack web application for users to view recipes of drinks and share their own dirnks with or without recipes.\
This app could help people who want to make cocktails by their own with detailed instructions and ingredients.

#### Live Demo: [mybar](http://ec2-52-53-165-181.us-west-1.compute.amazonaws.com/)

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Usage](#usage)
- [Authors](#authors)
- [Contact](#contact)

## Overview

![demo](/image/demo.gif)

## Architecture

![overview](/image/overview.png)
The app is made with MERN stack (MongoDB, Express, React and Nodejs), drinks data is powered by [TheCocktailDB](https://www.thecocktaildb.com/api.php). We also use AWS S3 to store image uploaded by users and deploy our app on AWS EC2.

## Features

- View drinks and their recipes
- Ingredient details
- Random drinks
- Search drinks by keyword
- User authentication
  - Sign up via Google OAuth
  - Sign up with username, email and password
- User profile
  - Upload avatar
- User favorite list
  - Add/Remove drinks to own collection
- Manage posts
  - Allow user to do CRUD operations and upload image

---

## Usage

### Clone the repo

```
git clone https://github.com/linchen1010/myBar.git
```

### Install dependencies (frontend & backend)

```
# in root directory
npm install
cd client
npm install
```

### Credential part

For MongoDB Altas and Google OAuth, you need to register for the services and add keys in config folder.\
For Google OAuth, you will also need to add some credential setting like URL callback in their service.

```
# /config/dev.js
module.exports = {
  googleClientID: YOUR_GOOGLE_CLIENT_ID,
  googleClientSecret: YOUR_GOOGLE_CLIENT_SECRET,
  mongoURI: YOUR_MONGO_URI,
  cookieKey: YOUR_COOKIEKEY,
  SESSION_SECRET: YOUR_SESSION_SECRET,
};

```

As for AWS S3 part, you need to register for AWS S3 service and create a .env file in root and add the following to .env file.

```
AWS_ACCESS_KEY_ID = YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = YOUR_AWS_SECRET_ACCESS_KEY
AWS_REGION: YOUR_AWS_REGION
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev
# Run backend only
npm run start
```

## Future work

- Integrate bar information with posts
  - More enjoyable for people who love drinks
- Share comments between users
- User post ranking

## License

[MIT License](LICENSE)

## Authors

[Shi-Lin Chen](https://github.com/linchen1010)
[Yen-Ting Lin](https://github.com/linyenting365)

## Contact

#### Email:

- [Shi-Lin Chen](shilinch@usc.edu)
- [Yen-Ting Lin](ylin2150@usc.edu)
