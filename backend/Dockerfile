# Based on https://github.com/python-poetry/poetry/issues/1178

FROM python:3.10-alpine AS builder
WORKDIR /app
ADD pyproject.toml poetry.lock /app/

RUN apk add build-base libffi-dev gcc musl-dev postgresql-dev 
RUN pip install poetry
RUN poetry config virtualenvs.in-project true
RUN poetry install --no-ansi

# ---

FROM python:3.10-alpine
WORKDIR /app

COPY --from=builder /app /app
ADD . /app

RUN adduser app -h /app -u 1000 -g 1000 -DH
USER 1000

# change this to match your application
ENTRYPOINT ["/app/bin/docker-entrypoint-web"]

EXPOSE 8000

CMD ["gunicorn", "-c", "python:config.gunicorn", "config.wsgi"]