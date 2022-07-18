FROM node@sha256:dc92f36e7cd917816fa2df041d4e9081453366381a00f40398d99e9392e78664
# node:14.18.1-alpine

ENV BABEL_CACHE_PATH=/tmp/babel-cache.json

WORKDIR /app

COPY package.json .babelrc gasket.config.js app.config.js manifest.xml /app/

COPY node_modules /app/node_modules
COPY dist /app/dist

COPY config /app/config
COPY lifecycles /app/lifecycles
COPY src /app/src
COPY public /app/public

RUN mkdir -p /app/.pccache/ && chown -R nobody: /app/.pccache/
RUN mkdir -p /.cache/ && chown -R nobody: /.cache/

EXPOSE 8080
USER nobody
