FROM node:23-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.27-alpine AS run

COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /var/www/html
