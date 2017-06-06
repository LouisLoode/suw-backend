# Design-Finishes

Design-Finishes is a finishes catalog for Dinex.

### Installation

Design-Finishes requires [Docker](https://www.docker.com/) to run. The app is accessible with http://localhost:3000

Up in dev mode

```sh
$ docker-compose -f docker-compose.yml -f development.yml up --build
```

Down in dev mode

```sh
$ docker-compose -f docker-compose.yml -f development.yml down
```

For production environments...

```sh
$ docker-compose -f docker-compose.yml -f production.yml up --build
```

Down for production mode

```sh
$ docker-compose -f docker-compose.yml -f production.yml down
```

### Update DB

```sh
$ docker exec -it dinex_web rails db:drop RAILS_ENV=docker
$ docker exec -it dinex_web rails db:create RAILS_ENV=docker
$ docker exec -it dinex_web rails db:migrate RAILS_ENV=docker
$ docker exec -it dinex_web rails db:seed RAILS_ENV=docker
```


### Update DB

```sh
$ docker exec -it dinex_web rails db:drop RAILS_ENV=docker
$ docker exec -it dinex_web rails db:create RAILS_ENV=docker
$ docker exec -it dinex_web rails db:migrate RAILS_ENV=docker
$ docker exec -it dinex_web rails db:seed RAILS_ENV=docker
```
