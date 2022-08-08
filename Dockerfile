FROM node:16.16-alpine3.15

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install 

COPY . .

EXPOSE 80

CMD [ "yarn", "webpack-dev-server", "--port", "80" ]
