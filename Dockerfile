FROM 18.18-alpine3.18

WORKDIR /usr/src/app

COPY . .

RUN yarn install --network-timeout 600000

RUN mv .env.example .env

EXPOSE 80

CMD [ "yarn", "webpack-dev-server", "--port", "80" ]
