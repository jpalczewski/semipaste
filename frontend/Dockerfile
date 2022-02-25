FROM node:16.14.0-alpine AS appbuild
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
#COPY .babelrc ./
RUN yarn install
COPY src/ ./src/
COPY public/ ./public/
#RUN npm run build

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