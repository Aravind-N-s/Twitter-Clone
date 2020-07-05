FROM node:alpine

WORKDIR /home/twitter-clone

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]