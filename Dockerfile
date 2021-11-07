FROM node:10 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

ENV REACT_APP_CLIENT_ID=857084839024-c7567nj975i2dchtn6relkbmb3if6a45.apps.googleusercontent.com

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

CMD ["nginx","-g","daemon off;"]
