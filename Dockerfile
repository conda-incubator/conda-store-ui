# Keep this in sync with the Node version specified for the Conda dev environment (in environment_dev.yml)
FROM node:18.18-alpine3.18

RUN corepack enable

WORKDIR /usr/src/app

COPY . .
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn \
    yarn install --immutable --network-timeout 600000 && \
    if [[ ! -f ".env" ]]; then mv .env.example .env; fi;



EXPOSE 8000

CMD [ "yarn", "run", "start:ui" ]
