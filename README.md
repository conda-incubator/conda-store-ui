# conda-store-ui

React-based UI for [conda store](https://github.com/Quansight/conda-store)

## How to run

Checkout the project and start the `docker-compose` stack :
```sh
git clone https://github.com/Quansight/conda-store.git
cd conda-store 
docker-compose up --build -d
```

- once running, you can log in with the default credentials `admin/password`

## How to run locally - dev mode

Checkout the project and start the `docker-compose-dev` stack :
```sh
git clone https://github.com/Quansight/conda-store.git
cd conda-store 
docker-compose -f docker-compose-dev.yml up --build -d      
```

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

- `REACT_APP_API_URL` - base API url that will be used when creating RTK Query queries
- `REACT_APP_AUTH_METHOD` - method of authentication.
  - value `cookie` lets users authenticate with a login process. **This is the prefered option. conda-store API and conda-store UI must both be under the same domain.**
  - value `token` lets you set up a token in conda-store, and use conda-store authenticated as the user who created the token.
- `REACT_APP_AUTH_METHOD` - URL endpoint to authenticate. Check the example below.
- `REACT_APP_AUTH_TOKEN` - authentication token required when the auth method is `token`


Here is an example if you run conda-store locally :
```
REACT_APP_API_URL=http://localhost:5000/conda-store
REACT_APP_AUTH_METHOD=cookie
REACT_APP_LOGIN_PAGE_URL=http://localhost:5000/conda-store/login?next=
REACT_APP_AUTH_TOKEN=
```