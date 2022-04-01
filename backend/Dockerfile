# syntax = docker/dockerfile:1
# Based on https://github.com/python-poetry/poetry/issues/1178

FROM python:3.10-alpine AS builder
WORKDIR /app
ARG PRODUCTION

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN --mount=type=cache,id=apk,target=/var/cache/apk   ln -vs /var/cache/apk /etc/apk/cache && \
    apk add --update build-base libffi-dev gcc musl-dev postgresql-dev git rust cargo

RUN --mount=type=cache,id=pip,target=/root/.cache/pip  pip install poetry &&  \
    mkdir /venv && \
    poetry config virtualenvs.path /venv && \
    poetry config installer.parallel true
#poetry config virtualenvs.in-project true



ADD pyproject.toml poetry.lock /app/

RUN --mount=type=cache,id=poetry,target=/root/.cache/pypoetry  --mount=type=cache,id=pip,target=/root/.cache/pip if [ -n "$PRODUCTION" ]; then arg="--no-dev" ; fi && \
    poetry install --no-ansi $arg &&     poetry run pip install  --force-reinstall setuptools==59.6.0

# ---

FROM python:3.10-alpine as backend
WORKDIR /app

COPY --from=builder /app /app
COPY --from=builder /venv /venv
COPY  entrypoint.sh /entrypoint
ADD . /app
RUN  --mount=type=cache,id=apk,target=/var/cache/apk ln -vs /var/cache/apk /etc/apk/cache && \
    apk add  --update  libpq  libgcc && \
    adduser app -h /app -u 1000 -g 1000 -DH && \
    chown  app . && \
    chown app /entrypoint &&  \
    chmod +x /entrypoint && \
    sed -i 's/\r$//g' /entrypoint && \
    sed -i 's/\r$//g' /app/start.sh && \
    pip install  --force-reinstall setuptools==59.6.0

USER 1000

# change this to match your application
#ENTRYPOINT ["/app/bin/docker-entrypoint-web"]

ENTRYPOINT [ "/entrypoint" ]
#CMD [ "executable" ]
EXPOSE 8000

#CMD ["gunicorn", "-c", "python:config.gunicorn", "config.wsgi"]
#CMD /app/.venv/bin/python manage.py runserver 0.0.0.0:8000
