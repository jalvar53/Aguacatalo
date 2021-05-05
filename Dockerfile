FROM node:fermium-buster-slim as base
LABEL Description="Dockerfile para Aguacatalo"
WORKDIR /usr/src/app

FROM base as deps
COPY package*.json ./
COPY src/ ./
COPY index.js ./
RUN npm install --quiet --unsafe-perm --no-progress --production 

FROM deps as prod
COPY --from=deps /usr/src/app/node_modules/ node_modules
COPY --from=deps /usr/src/app/package.json ./

CMD ["node", "index.js"]
