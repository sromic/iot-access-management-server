## Description

IIoT AMS HOLTC and operator APIs

## Installation

```bash
$ npm install
```

## DB initalization and migration

Setup a new Prisma project
```
$ npx prisma init
```

Generate artifacts (e.g. Prisma Client)
```  
$ npx prisma generate
```

Browse your data
```
$ npx prisma studio
```

Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
```
$ npx prisma migrate dev
```

Pull the schema from an existing database, updating the Prisma schema
```
$ npx prisma db pull
```

Push the Prisma schema state to the database
```
$ npx prisma db push
```

Deploy migrations to production/test env
```
$ npx prisma migrate deploy
```

## Running the app

```
* create .env file with DB connection string for PROD env
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
