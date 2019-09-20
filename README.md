**Installation**

The first step, you must install packages run

    `npm install`

The second step, you must install postgresql(instruction for ubuntu)

    `sudo apt update`
    `sudo apt install postgresql postgresql-contrib`
    
The next step, you must create user for postgresql
    
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
    
**Packages**
    
    "aws-sdk": "^2.530.0"
    "body-parser": "^1.19.0",
    "debug": "^4.1.1",
    "dotenv": "^8.1.0",
    "ejs": "^2.7.1",
    "express": "^4.17.1",
    "express-jwt": "^5.3.1",
    "jade": "~1.3.0",
    "jsonwebtoken": "^8.5.1",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0",
    "pg": "^7.12.1",
    "pg-hstore": "^2.3.3",
    "sequelize": "^5.18.4",
    "static-favicon": "~1.0.0",
    "winston": "^3.2.1"
    "cross-env": "^5.2.1",
    "jest": "^24.9.0",
    "nodemon": "^1.19.2",
    "supertest": "^4.0.2"
