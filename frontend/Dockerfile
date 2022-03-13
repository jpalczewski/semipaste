# syntax = docker/dockerfile:1
FROM node:16.14.0-alpine AS appbuild
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
#COPY .babelrc ./
RUN --mount=type=cache,id=yarn,target=/usr/local/share/.cache/yarn  mkdir "/node" && \
     yarn install  && \
     adduser --disabled-password  app && \
     chown -R app:app /app /node
COPY src/ ./src/
COPY public/ ./public/

USER app

CMD yarn start

# Build Stage 2
# FROM node:10.15.2-alpine

# WORKDIR /usr/src/app

# COPY package.json ./

# COPY .babelrc ./

# RUN yarn

# #COPY --from=appbuild /usr/src/app/dist ./dist
# COPY --from=appbuild /usr/src/app/ .

# EXPOSE 4002

# CMD yarn start
