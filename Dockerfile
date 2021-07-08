FROM node:14-alpine

WORKDIR /var/www/node-ts

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i

COPY . .

CMD [ "npm", "start" ]