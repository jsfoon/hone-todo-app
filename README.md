# Hono Todo App

## Database

### Running Postgres Server

```sh
docker compose postgres up -d
```

### Migration

```sh
docker compose migrate
```

## Backend

```sh
docker compose backend up -d
```

### Backend Test Case

```sh
# start postgres test server
docker compose up postgres_test -d  
docker compose --env-file .env.test up migrate
# run test
bun --env-file=.env.test test:watch
```

## Frontend

```sh
docker compose frontend up
```

### Frontend Test Case

```sh
# start postgres test server
docker compose up postgres -d  
docker compose backend up -d
# run test
bun test:e2e
# show report
bun test:report
```
