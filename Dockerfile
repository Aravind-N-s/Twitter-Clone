FROM node:10.3.0-slim

WORKDIR /home/backend-twitter

COPY ./package.json ./

RUN npm install

EXPOSE 3005

EXPOSE 3006

COPY . .

CMD ["npm", "start"]