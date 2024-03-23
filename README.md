
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description 📖

This NestJS application provides a robust foundation for building a second-hand marketplace platform.

## Features 🚀

### User Management:
- Users can register with email and password for secure account creation.
- Login functionality allows users to access their accounts and interact with the marketplace.

### Item Management:
- Users can advertise items they wish to sell, providing detailed descriptions and relevant information.
- Users can view all advertised items, allowing them to browse the marketplace for potential purchases.
  
### Admin Approval:
- An admin role oversees item approval, ensuring the quality and legitimacy of items listed on the marketplace.

## Installation

```bash
1. Clone the repository: 
https://github.com/OrNixz/upcycled.git

2. Navigate to the project directory: 
cd your-project-name

3. Install dependencies: 
$ npm install
```

## Running the app

```bash
# Development
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

## Test

```bash
# Unit tests
$ npm run test

# E2e tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## API Endpoints

| Name     | Method | URL            | Body/Query String                                           | Description                             |
|----------|--------|----------------|-------------------------------------------------------------|-----------------------------------------|
| register | POST   | /auth/register | Body - {name, email, password}                              | Create a new user data                  |
| login    | POST   | /auth/login    | Body - {email, password}                                    | Validate data with existing users       |
| logout   | POST   | /auth/logout   | -                                                           | Terminates user session                 |
| whoami   | GET    | /auth/whoami   | -                                                           | Provides information about current user |
| item     | GET    | /items         | Query String - {name, location, category, year}             | Display list of secondhand items        |
| item     | POST   | /items         | Body - {name, description, price, location, category, year} | Create a new secondhand item            |
| item     | PATCH  | /items         | Body - {approved}                                           | Approve or reject an item from the user |
| user     | GET    | /users         | Query String - {email} (optional)                           | Display list of registered users        |
| user     | POST   | /users         | Body - {name, email, password}                              | Create a new user data (deprecated)     |
| user     | GET    | /users/:id     | -                                                           | Display a specific user based on the ID |
| user     | PATCH  | /users/:id     | Body - {name, email, password} (optional)                   | Update user data information            |
| user     | DELETE | /users/:id     | -                                                           | Remove user data information            |

## Images
<details>
    <summary>Click to see!</summary>

  ### 1. Modules
    
  - Overview

  ![](https://github.com/OrNixz/upcycled/blob/main/images/overview.png)

  - App module

  ![](https://github.com/OrNixz/upcycled/blob/main/images/app-module.png)

  - Auth module

  ![](https://github.com/OrNixz/upcycled/blob/main/images/auth-module.png)

  - Users module

  ![](https://github.com/OrNixz/upcycled/blob/main/images/users-module.png)

  ### 2. Register

  ![](https://github.com/OrNixz/upcycled/blob/main/images/register.png)

  ### 3. Login

  ![](https://github.com/OrNixz/upcycled/blob/main/images/login.png)

  ### 4. Logout

  ![](https://github.com/OrNixz/upcycled/blob/main/images/logout.png)

  ### 5. Whoami

  ![](https://github.com/OrNixz/upcycled/blob/main/images/whoami.png)

  ### 6. Get users

  ![](https://github.com/OrNixz/upcycled/blob/main/images/get-users.png)

  ### 7. Get user (With query params)

  ![](https://github.com/OrNixz/upcycled/blob/main/images/get-user-with-query-params.png)

  ### 8. Get user (Based on user ID)

  ![](https://github.com/OrNixz/upcycled/blob/main/images/get-user-based-on-id.png)

  ### 9. Add user

  ![](https://github.com/OrNixz/upcycled/blob/main/images/post-user.png)

  ### 10. Update user

  ![](https://github.com/OrNixz/upcycled/blob/main/images/update-user.png)

  ### 11. Delete user

  ![](https://github.com/OrNixz/upcycled/blob/main/images/delete-user.png)

  ### 12. Add item

  ![](https://github.com/OrNixz/upcycled/blob/main/images/post-item.png)

  ### 13. Approve item by admin

  ![](https://github.com/OrNixz/upcycled/blob/main/images/item-approved.png)

  ### 14. Get items

  ![](https://github.com/OrNixz/upcycled/blob/main/images/get-items.png)

  ### 15. Get item (With query params)

  ![](https://github.com/OrNixz/upcycled/blob/main/images/get-item-with-query-params.png)

</details>

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).



