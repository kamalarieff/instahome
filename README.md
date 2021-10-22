# Welcome to instahome 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](http://localhost:3001/api-docs)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> Get the total of a cart based on the company given

### ✨ [Demo](http://localhost:3000)

## Install

```sh
npm install
npm run bootstrap
```

## Usage

```sh
npm run start
```

If you want to front end to communicate with the NestJS back end, change the `VITE_BACKEND_PORT` port in `packages/frontend/package.json:start` to 3002.

## Run tests

```sh
npm run test
```

## Author

👤 **Kamal Arieff**

* Website: https://kamalarieff.com
* Github: [@kamalarieff](https://github.com/kamalarieff)
* LinkedIn: [Kamal Arieff Ahmad Faizel](https://www.linkedin.com/in/kamal-arieff-ahmad-faizel-058b0a79/)

## Documentation

### Ideology

The rules are stored in the back end API (note that there are two implementation of the back end part, one in express and the other in NestJS). This part is the only tight coupling where the back end has to send a specific type of response in order for the front end to build the rules object.

To understand what I mean, check out the tests from this file `packages/frontend/src/utils/engine/__tests__/rules.spec.js`.

In order to help with this, I've moved the type definition to a shared package so that it is easier for the back end to construct the responses. 

You can find the types in this directory `packages/types/index.d.ts`.

Right now, the calculation is done on the front end. But it could easily be done on the back end. We just have to pass the cart values to an API.

#### How to update the rules for the offers?

You can go to `packages/backend/data/index.ts` to update them.

For the NestJS project, you can update the service file instead in `packages/nest/data/src/app.service.ts`.

### API Docs

The documentation for the API is written using swagger. You can check it out by running this project and go to http://localhost:3001/api-docs.

### Technologies

#### Project

I'm using lerna to host the front end, back end and the types. By using lerna, it is easier to get everything up and running with a single command. Lint-staged to run commands on staged files. Husky for git hooks.

#### Front end

React for components. Vite for building. Tailwind for UI styling. React-query to fetch data from the API. Jest for testing. eslint and prettier for code formatting.

#### Back end

##### Express

Express for routing. Jest and supertest for testing. Express-validator for validating the params. Swagger for API documentation. 

##### NestJS

Kambiz mentioned you guys are using NestJS. I haven't used it before so I figured why not give it a try. I only had a couple of hours to play around with it so my implementation might be too rudimentary. I didn't have time to implement the same swagger document in NestJS project compared to the express one. 

### Issues

Note that I ran into some issues when I tried to install the dev tools on the front end package. The error was about the eslint-plugin-react version not compatible with vite I think.

To fix that, I had to run this two commands:

```
npm install eslint-plugin-react --save-dev --force
npm install @typescript-eslint/eslint-plugin --save-dev
```

If this affects the back end development, you should just remove this dev tools.
