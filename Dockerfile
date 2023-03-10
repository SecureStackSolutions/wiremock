FROM node:18-alpine3.15 as watcher

COPY package.json ./

RUN apk add openjdk8-jre
RUN apk add --update python3 make g++ \
    && rm -rf /var/cache/apk/*

RUN yarn

COPY . .

CMD yarn start
