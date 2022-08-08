# conda-store-ui

React-based UI for [conda store](https://github.com/Quansight/conda-store)

## How to run

To run conda-store and conda-store-ui, use the `docker-compose.yml` file at the root of the project :

```sh
docker-compose up --build -d
```

To run the UI only, use :

```
conda create --name conda-store-ui
conda activate conda-store-ui
conda install -c conda-forge nodejs==16.14.2

yarn install
yarn run build
yarn run start
```

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
