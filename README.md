# Todos Server App
Demo Todos app created with React, Express, MySQL, Sequelize and GraphQL.

## Setup

### Install MySQL
First, in order to be able to run the project you have to download and install MySQL Community Server localy.
- [Download MySQL](https://dev.mysql.com/downloads/mysql/)
- [MySQL Installation Guide](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)

### Install Redis
Second, you will need to install the Redis in-memory store since it's used for storing tokens.
- [Getting started with Redis](https://redis.io/docs/getting-started/)

### Install node packages
Just run the `npm i` command.

### Run the DB migrations
Run the `npx sequelize-cli db:migrate` command.

### Start the server
Run `npm run start-dev` and the server should open on http://localhost:80