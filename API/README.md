# Project Setup Guide

## Environment setup
- Node JS
- mysql
- sequelize-cli

## Install dependencies

- Inside `API` directory run `npm install` to install dependencies.
- Create separate databases for production, development and testing
- Inside `src` directory run `sequelize db:seed:all --env [development, production]` to add an admin user and service types
- Set environment variables before running on production

## Run Server
 Inside `API` directory
- Run `npm run dev`
- Run `npm run test`
- Run `npm run prod`
