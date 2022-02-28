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


#* 'docker-compose up -d' may be sufficent 
```
