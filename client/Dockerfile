FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN chmod 2777 "/usr/src/app"

RUN npm install --pure-lockfile

EXPOSE 3000

COPY . .

CMD ["npm", "start"]