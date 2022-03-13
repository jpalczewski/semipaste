# wklejsrednik
## Usage
```bash
# about a few minutes in order to build everything
docker-compose build

# to run interactively, to see logs realtime
docker-compose up

# to enter shell on backend - you need to have working postgres database*
docker-compose run backend /bin/sh

#run backend tests
docker-compose run backend pytest --cov


## in order to have working volumes in frontend
 docker-compose -f .\docker-compose.frontend.yml -f .\docker-compose.yml up


#* 'docker-compose up -d' may be sufficent
```
## How to's

### How to add a new library in backend?
You need to have a `poetry` tool installed on your system and run
`poetry add <lib>` in backend directory. Then rebuild the container - `docker-compose build`
