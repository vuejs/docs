# Dockerizing Vue App

## What is Docker

[Docker](https://docker.com) is widely known as a tool allows developers to pack and run applications in isolation. It also solves the deployment problem.

## Prerequisites

First of all, make sure you have Docker installed.
You could get it [here](https://docs.docker.com/get-docker).
Docker version should be >= 17.05.

Then create a Vue project using [vue-cli](https://cli.vuejs.org/).

## Base example

1. Create a `.dockerignore` file in the root of your project and paste following:

```
node_modules
```

There are files and directories Docker should ignore in order to increase the build performance.

2. Create a `Dockerfile` file in the root of your project and paste following:

```Dockerfile
# Specify the base Docker Image and a version
FROM node:16-alpine

# Specify the working directory of the future Docker Container
WORKDIR /app

# Globally install `serve` to serve our SPA
RUN yarn global add serve

# Copy files contains installation instructions into the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy rest files/directories
COPY . .

# Build the production
RUN yarn build

# Run this command when the container would running
CMD ["serve", "-s", "dist"]
```

:::info
Docker has two main entities: _Docker_ Image and _Docker Container_.

- Docker Image stands for a template of a Docker Container. Contains layers can be cached;
- Docker Container is an environment in which your app is running. Is like a Virtual Machine but uses the resources of the actual OS and is more lightweight.
  :::

3. Build the image. Open the terminal and type:

```
docker build --tag vue-docker-image .
```

Options:

- `--tag` (`-t`) let us to name the image and easily find it;
- `.` is the path to the Dockerfile.

So we create our image and you can see it by executing `docker images` command.

4. Run the container

```
docker run --tty -p 8080:5000 --name vue-docker-app vue-docker-image
```

Options:

- `--tty (-t)` allows us to see the logs of the container;
- `-p` maps ports in the **HOST_PORT:CONTAINER_PORT** format;
- `--name` let us to name the container;
- `vue-docker-image` is the name of the our image.

We mapped ports as above because `serve` starts on the default port 5000
and we want to see our app running on the 8080 port.

Open the browser and go to <http://localhost:8080>. Here we are!

![Screenshot](/images/vue-docker-sample.png)

5. Stop the container by the following command: `docker stop vue-docker-app`.

## Real-world example

Getting closer to reality we would like to replace `serve` with `nginx` as it has many useful features and best suited for serving static files.

Firstly, create the `nginx.conf` file in the root of your project and paste it:

```nginx
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        include  /etc/nginx/mime.types;
        root /usr/share/nginx/html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

This is a simple configuration for the NGINX web server.

:::tip
Pay attention we added the `try_files` instruction
that redirects all the routes
to the `index.html` file in the root folder.
If your app doesn't use `Vue Router`
feel free to remove the `location` block.
:::

Secondly, replace the content of the `Dockerfile` to:

```Dockerfile
# Specify the base Docker Image and a version
FROM node:16-alpine AS build-stage

# Specify the working directory of the future Docker Container
WORKDIR /app

# Copy files contains installation instructions into the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy rest files/directories
COPY . .

# Build the production
RUN yarn build


# Specify NGINX as the new base image
FROM nginx:stable-alpine

# Replace NGINX default config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy `dist` folder into NGINX
COPY --from=build-stage /app/dist /usr/share/nginx/html
```

What was actually changed? We don't need `serve` anymore, added NGINX and a new stage.
Due to multi-stage build we are able to use the production folder in the new stage from the previous.

How to run this?

1. Rebuild Image

`docker build --t vue-docker-image .`

2. Remove the previous container

`docker rm vue-docker-app`

3. Run the new container

`docker run -d -t -p 8080:80 --name vue-docker-app vue-docker-image`

`-d` runs a container in the detach mode (background).

Open the <http://localhost:8080>.

## Debug

There are several ways to debug your container.

1. Using `docker inspect`

This command provides detailed information about a container in a JSON-based view.

Example:

`docker inspect vue-docker-app`

2. Using `docker exec`

This command executes a provided command in a running container.

Example:

`docker exec -it vue-docker-app /bin/sh`

`-it` means "interactive" mode. `-i` for STDIN open and `-t` for logs outside.

By this we can run `shell` commands e.g. `cd`, `ls`, `mkdir`, `cat`, `vi`.

## Bonus: docker-compose

Building multi-containers apps may tire using `Dockerfile` only.
It is more easy to run all the containers by [Docker Compose](https://docs.docker.com/compose) tool.
It also allows containers to communicate between themselves.

Create a `docker-compose.yml` file:

```yml
services:
  frontend:
    build: .
    ports:
      - 8080:80
```

Run `docker-compose up` and see the result!

Later you can add more services like backend, database and other.

## Additional context

Quoting Docker documentation:

> Docker helps to reduce the delay between writing code and running it in production.

Nowadays it's hard to imagine an IT department that doesn't use Docker.

From the developers side it allows to use and share own docker images using [Docker Hub](https://hub.docker.com).

From the DevOps engineers side it allows to build a test/production environment,
set up CI/CD and even create own [Docker Registry](https://docs.docker.com/registry).

As your application grows and to improve resilience you might want to use [Kubernetes (k8s)](https://kubernetes.io). It runs multiple replicas of containers inside a cluster and organizes load balancing.

## When to avoid this pattern

As a front-end developer using Docker may be overkill especially
if you don't have a complex app that directly depends on services such as backend and database
or if you don't need to deploy your app on servers by yourself.

## Alternative patterns

If you need just to deploy your app you might be happy with
[Netlify](https://www.netlify.com/)
or [Vercel](https://vercel.com/).
They allow to easily deploy your applications
and they have Continuous Deployment integrated with GitHub, GitLab and other.
