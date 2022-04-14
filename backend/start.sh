#!/bin/sh

export PYTHONUNBUFFERED=1

python manage.py migrate
python -u  manage.py runserver 0.0.0.0:8000
