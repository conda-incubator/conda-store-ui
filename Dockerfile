FROM node:16.16-alpine3.15

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN mv .env.example .env

EXPOSE 80

CMD [ "yarn", "webpack-dev-server", "--port", "80" ]
