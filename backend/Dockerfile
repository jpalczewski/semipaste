# syntax = docker/dockerfile:1
# Based on https://github.com/python-poetry/poetry/issues/1178

FROM python:3.10-bullseye AS builder
WORKDIR /app
ARG PRODUCTION

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN --mount=type=cache,id=pip,target=/root/.cache/pip  pip install poetry &&  \
    mkdir /venv && \
    poetry config virtualenvs.path /venv && \
    poetry config installer.parallel true



ADD pyproject.toml poetry.lock /app/

RUN --mount=type=cache,id=poetry,target=/root/.cache/pypoetry  --mount=type=cache,id=pip,target=/root/.cache/pip if [ -n "$PRODUCTION" ]; then arg="--no-dev" ; fi && \
    poetry install --no-ansi $arg

# ---

FROM python:3.10-slim-bullseye as backend
WORKDIR /app

COPY --from=builder /app /app
COPY --from=builder /venv /venv
COPY  entrypoint.sh /entrypoint
ADD . /app
RUN apt-get update && apt-get install -y  libpq5 && \
    useradd app  -d /app && \
    chown  app . && \
    chown app /entrypoint &&  \
    chmod +x /entrypoint && \
    sed -i 's/\r$//g' /entrypoint && \
    sed -i 's/\r$//g' /app/start.sh

USER 1000



ENTRYPOINT [ "/entrypoint" ]
EXPOSE 8000
