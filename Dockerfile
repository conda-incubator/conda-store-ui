FROM node:18.18-alpine3.18

WORKDIR /usr/src/app

COPY . .
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn \
    yarn install --network-timeout 600000 && \
    if [[ ! -f ".env" ]]; then mv .env.example .env; fi;



EXPOSE 8000

CMD [ "yarn", "run", "start:ui" ]
