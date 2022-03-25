# wklejsrednik

## Usage
```bash
# about a few minutes in order to build everything
docker-compose build

# to run interactively, to see logs realtime
docker-compose -f docker-compose.dev.yml up

# to enter shell on backend - you need to have working postgres database*
docker-compose -f docker-compose.dev.yml run backend /bin/sh

#run backend tests
docker-compose -f docker-compose.dev.yml run backend pytest --cov


## in order to start without front - you have to start it on your own by yarn.
docker-compose -f docker-compose.frontend.yml  up


#* 'docker-compose up -d' may be sufficent
```

## Docker compose files and differences between them

In repo you can find three docker composes:
-  `docker-compose.frontend.yml` with disabled frontend container - due to problems related with hot reload in recent version react-create-app.
- `docker-compose.dev.yml` which is designed to debug things
- `docker-compose.prod.yml` which _will_ be optimized for production use.

## How to's

### How to add a new library in backend?
You need to have a `poetry` tool installed on your system and run
`poetry add <lib>` in backend directory. Then rebuild the container - `docker-compose build`

## Troubleshooting

### Starting a docker container fails on Windows due to `migrate\r`

Wheter git thinks that automatic CRLF would be great on  Windows - it isn't our case
because we are mounting the backend directory as a volume to the apprioprate container.
One of solution is running following set of commands in this repo:
```bash
git config core.eol lf
git config core.autocrlf input
git rm -rf --cached .
git reset --hard HEAD
```
This will force storing all files with LF file ending

### Relay can't compile new queries

It might be related with schema out of date. There are steps to fix it:
1. Have a working database in the backround - `docker-compose -f docker-compose.dev.yml up -d`
2. Run `docker-compose -f .\docker-compose.yml  run backend python manage.py graphql_schema --schema schema.schema_v1 --out schema.graphql`
3. Copy schema.graphql from `backend` folder to `frontend`
