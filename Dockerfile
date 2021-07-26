FROM node:12-alpine

WORKDIR /usr/src/api

COPY package*.json ./

RUN chmod 2777 "/usr/src/api"

RUN npm install --pure-lockfile

EXPOSE 9000

COPY . .

CMD ["npm", "start"]