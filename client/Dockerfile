FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN chmod 2777 "/usr/src/app"

RUN npm install --legacy-peer-deps

EXPOSE 3000

COPY . .

CMD ["npm", "start"]