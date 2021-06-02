FROM node:fermium-buster-slim as base
LABEL Description="Dockerfile para Aguacatalo"
WORKDIR /usr/app

FROM base as deps
COPY package*.json ./
COPY src/ ./src
COPY index.js ./
RUN apt update && apt-get --no-install-recommends install -y build-essential python
RUN npm install --quiet --unsafe-perm --no-progress --production 

CMD ["node", "index.js"]
