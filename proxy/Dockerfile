FROM node:16.14.0-alpine AS appbuild
WORKDIR /app
COPY package.json yarn.lock tsconfig.json schema.graphql .babelrc setup.js ./
#COPY .babelrc ./
RUN --mount=type=cache,id=yarn,target=/usr/local/share/.cache/yarn/v6   \
     yarn install
COPY src/ ./src/
COPY public/ ./public/

RUN yarn build


FROM nginx:1.22.0-alpine AS server
COPY --from=appbuild /app/build /usr/share/nginx/html
EXPOSE 80
