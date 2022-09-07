# conda-store-ui

React-based UI for [conda store](https://github.com/Quansight/conda-store)

## How to run

_This procedure will be updated once we can leverage the login capability of conda-store._  
_For the moment, we need to run conda-store separately and create a token._

- First, run conda-store separately :

```sh
git clone https://github.com/Quansight/conda-store.git
cd conda-store 
docker-compose up --build -d
```

- once running, visit [http://localhost:5000/conda-store/](http://localhost:5000/conda-store/), and log in with the default credentials `admin/password`

- click on `User`, then `create token`, and copy it 

- create your .env for for `conda-store-ui` :
```
cd conda-store-ui # change according to where your directory is located
cp .env.exemple .env
```
and then **edit it** to change the `REACT_APP_AUTH_TOKEN` line with the token you created at the previous step.

Then, run the UI :

```
conda create --name conda-store-ui
conda activate conda-store-ui
conda install -c conda-forge yarn nodejs==16.14.2

yarn install
yarn run build
yarn run start --port 80
```

Once you see the message `webpack 5.73.0 compiled successfully in ... ms` appearing, you can use the UI at url [http://localhost](http://localhost)


## Run unit testing using Jest

```
yarn test     // find every test with the .test.[tsx|ts] extension
yarn report   // show coverage collected after running the first command in the browser
yarn report test/AddChannel.test.tsx     // run a single test instead of all
```

## ENV file setup

In order to setup the environment variables correctly, you should create a .env file and inside copy the contents of the .env.example file.
REACT_APP_API_URL - base API url that will be used when creating RTK Query queries
REACT_APP_AUTH_TOKEN - authentication token required for access to certain endpoints
REACT_APP_AUTH_METHOD - see https://github.com/Quansight/conda-store-ui/issues/53
