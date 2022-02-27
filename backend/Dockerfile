# Based on https://github.com/python-poetry/poetry/issues/1178

FROM python:3.10-alpine AS builder
WORKDIR /app
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apk update && apk add --no-cache build-base libffi-dev gcc musl-dev postgresql-dev && pip install poetry && poetry config virtualenvs.in-project true



ADD pyproject.toml poetry.lock /app/

RUN poetry install --no-ansi

# ---

FROM python:3.10-alpine
WORKDIR /app

COPY --from=builder /app /app
COPY  entrypoint.sh /entrypoint
ADD . /app
RUN apk update &&  apk add --no-cache libpq && adduser app -h /app -u 1000 -g 1000 -DH && chown  app . && chown app /entrypoint && chmod +x /entrypoint && sed -i 's/\r$//g' /entrypoint && sed -i 's/\r$//g' /app/start.sh
USER 1000

# change this to match your application
#ENTRYPOINT ["/app/bin/docker-entrypoint-web"]

ENTRYPOINT [ "/entrypoint" ] 
#CMD [ "executable" ]
EXPOSE 8000

#CMD ["gunicorn", "-c", "python:config.gunicorn", "config.wsgi"]
#CMD /app/.venv/bin/python manage.py runserver 0.0.0.0:8000