#!/bin/bash

/app/.venv/bin/python manage.py migrate
/app/.venv/bin/python manage.py runserver 0.0.0.0:8000