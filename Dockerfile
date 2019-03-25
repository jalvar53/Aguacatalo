FROM node:8.15-alpine

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]

RUN apk add --update \
    python \
    python-dev \
    build-base \
    gcc \
    ffmpeg \
    && rm -rf /var/cache/apk/*

RUN npm install && mv node_modules ../

COPY . .
EXPOSE 3000
CMD node index.js
