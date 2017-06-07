# SUW Backend

Backend project.

### Installation

SUW Backend project requires [Docker](https://www.docker.com/) to run. The app is accessible with http://localhost:3000

Up in dev mode

```sh
$ docker-compose up --build
```

Down in dev mode

```sh
$ docker-compose down
```

Up in production mode

```sh
$ docker-compose -f docker-compose.yml -f production.yml up --build
```

Down in production mode

```sh
$ docker-compose -f docker-compose.yml -f production.yml down
```
