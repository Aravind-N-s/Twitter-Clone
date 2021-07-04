FROM node:12-alpine

WORKDIR /usr/src/api

COPY package*.json ./

RUN chmod 2777 "/usr/src/api"

RUN npm install --pure-lockfile

EXPOSE 3005

EXPOSE 3006

COPY . .

CMD ["npm", "start"]