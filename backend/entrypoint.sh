#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset


/app/.venv/bin/python manage.py migrate
/app/.venv/bin/python manage.py runserver 0.0.0.0:8000