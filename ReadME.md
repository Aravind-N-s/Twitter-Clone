# Twitter Searching Project
#### Project Statement
- Create an app to view twitter searches.
#### Pre-Requisites
##### IGNORE IF ENVIRONMENT IS ALREADY SET UP
Download and Install [NodeJS](https://nodejs.org/en/)
Install the package manager [npm](http://npmjs.com/).
Use the package manager [npm](http://npmjs.com/) to install ReactJS.
```npm
npm install --save create-react-app
```
#### Initial Set-up
Use the package manager [npm](http://npmjs.com/) to install node packages required.
```npm
npm install
```
##### Cd into the client folder then
Use the package manager [npm](http://npmjs.com/) to install node packages required.
```npm
npm install
```
##### The following settings have to be set in the .env file to run the app
```
PORT = YOUR_PORT_ADDRESS

MONGO_URI = YOUR_MONGO_URI

JWT_SECRET = YOUR_JWT_KEY

ELASTIC_LOGSTASH_URL = YOUR_ELASTIC_URL

CONSUMER_KEY = YOUR_KEY

CONSUMER_SECRET = YOUR_SECRET

ACCESS_TOKEN = YOUR_TOKEN

ACCESS_TOKEN_SECRET = YOUR_TOKEN_SECRET
```

##### At the root folder run the following command to launch the project
```npm
npm run dev
```
##### To view API Documentation, Make Sure the .jsdoc config file exists then run the following command
```npm
npm run doc
```
view the output at the docs folder in the root directory.

#### Issues
- CORS not working for sockets in Chrome.
- AWS isn't hosted.

# License
[MIT](https://choosealicense.com/licenses/mit/)