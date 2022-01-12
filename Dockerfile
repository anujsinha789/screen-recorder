FROM node:10 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

CMD ["nginx","-g","daemon off;"]
