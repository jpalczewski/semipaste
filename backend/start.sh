#!/bin/sh

export PYTHONUNBUFFERED=1

python manage.py migrate

if [ -n "$PRODUCTION" ]; then
  gunicorn backend.asgi:application -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
else
    python -u  manage.py runserver 0.0.0.0:8000
fi
