**Installation**

The first step, you must install packages run

    `npm install`

The second step, you must create user for postgresql
    
    connect to the default postgres database with the default login information

    `psql postgres`
    
    Create user
    
    `postgres=# CREATE ROLE <your name for role> WITH LOGIN PASSWORD 'your password';`
    
    We want 'your role' to be able to create databases
    
    `postgres=# ALTER ROLE me CREATEDB;`
    
    Create database for project
    
    `postgres=> CREATE DATABASE <your name for database>;`
    
    Create database for testing project
    
    `postgres=> CREATE DATABASE <your name for testing database>;`

The next step, you must create file .env as .example.env and fill it 

    `touch .env`
    
The next step, you must create tables

    Run command

    `npx sequelize-cli db:migrate`

The next step, you must change environment from development to production
    
    In package.json file change scripts field from

    "scripts": {
         "start": "nodejs",
         "test": "cross-env NODE_ENV=test jest --testTimeout=10000",
         "migrate": "npx sequelize-cli db:migrate"
    }
    
    to
    
    "scripts": {
        "start": "cross-env NODE_ENV=production nodejs",
        "test": "cross-env NODE_ENV=test jest --testTimeout=10000",
        "migrate": "npx sequelize-cli db:migrate"
      }

**How do you Make Sure it Works?**
    
    Run test and looking at result
    
    `npm test`
    
**Usage**

    Start server and enjoy working :)
    
    `nodemon`
