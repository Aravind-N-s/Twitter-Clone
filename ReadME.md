# Twitter Search

#### Project Statement

- Implement a "Twitter Search" , using Material UI and Twitter API. 
- CI-CD pipeline for auto deploying of Application.

#### Pre-Requisites

##### Ignore if Environment is already set up

Download and Install [NodeJS](https://nodejs.org/en/)
Install the package manager [npm](http://npmjs.com/).
Use the package manager [npm](http://npmjs.com/) to install ReactJS.

Run the following commands to check for successful installation
```npm
node --version
npm --version
```

#### Initial Set-up

Use the package manager [npm](http://npmjs.com/) to install node packages required. Navigating to the project folder and to the client folder, run the following command. 

```npm
npm install
```

The application will take a while to install all the dependencies

The following settings have to be set in the .env file to run the app

PORT = YOUR_PORT_ADDRESS

MONGO_URI = YOUR_MONGO_URI

JWT_SECRET = YOUR_JWT_KEY

ELASTIC_LOGSTASH_URL = YOUR_ELASTIC_URL

CONSUMER_KEY = YOUR_KEY

CONSUMER_SECRET = YOUR_SECRET

ACCESS_TOKEN = YOUR_TOKEN

ACCESS_TOKEN_SECRET = YOUR_TOKEN_SECRET

##### Running the Project
In the Project folder run the following command 

```npm
npm run dev
```

The application should automatically open itself in the browser on http://localhost:3000

### Running Kubernetes
#### Pre-Requisites

##### Ignore if Environment is already set up

Download and Install [MiniKube] (https://minikube.sigs.k8s.io/docs/)
Download and Install [Docker](https://www.docker.com/) Not a hard requirement

Run the following commands to run kubernetes
```shell
minikube start
```

###### Kubectl 

Apply the following command to run it via the kubernetes yaml files

```shell
kubectl apply -f k8s
```


###### Helm 

Apply the following command to run it via the helm config

```shell
 helm install frontend helm/frontend --values helm/frontend/values.yaml
 helm install backend helm/backend --values helm/backend/values.yaml
```
The above secrets have to be added to the secret of minikube for the above to lift the application


#### Documentation

To view API Documentation, Make Sure the .jsdoc config file exists then run the following command
```node
npm run doc
```

#### Issues
Not tested in Windows.\
Helm isn't tested fully \
Need to merge CI-CD branch \
SSL certificates not set up \

# License

[MIT](https://choosealicense.com/licenses/mit/)
