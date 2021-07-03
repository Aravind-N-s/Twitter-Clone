FROM node:slim

WORKDIR /home/frontend-twitter

COPY ./package.json ./

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "start"]