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
