FROM node:20-alpine

WORKDIR /usr/src/api

COPY package*.json ./

RUN chmod 2777 "/usr/src/api"

RUN npm install --legacy-peer-deps

EXPOSE 9000

COPY . .

CMD ["npm", "start"]