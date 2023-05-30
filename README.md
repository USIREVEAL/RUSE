# About RUSE

RUSE, a web application which aggregates all the data and presents them, with an intuitive visualization, to the artist who can influence in real-time the sound synthesis and compositional processes.

# Live Service & Video

Live service at [RUSE homepage](https://ruse.si.usi.ch).

A video about RUSE available on Youtube at [RUSE video](https://youtu.be/NFbFRS4MNag).

# How to run

## ruse-frontend

Install all dependencies.

```
cd ruse-frontend
yarn install
```

Run the `frontend` locally using yarn with default port `3000`.

```
yarn start
```

## ruse-backend

Install all dependencies.

```
cd ../ruse-backend
npm i
```

Run the `backend` locally using node with default port `5234`.

```
node server
```

# Docker images

## Prerequisites

- Docker installed on the machine

## Build and tag docker images

Build and tag docker image for the `frontend`.

```
cd ruse-frontend
docker build -t ruse-frontend:latest .
docker tag ruse-frontend:latest ruse-frontend:staging
```

Build and tag docker image for the `backend`.

```
cd ruse-backend
docker build -t ruse-backend:latest .
docker tag ruse-backend:latest ruse-backend:staging
```

## Run docker images

Once you built and tagged your docker images you can run both images with the `docker-compose` file.

```
docker compose up
```

Now, open [RUSE](http://localhost:3000) in browser.
