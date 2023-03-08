# Installation 

There are multiple ways to utilize `conda-store-ui`. Here, we'll be looking at the supported methods of installation.

## Docker Installation

We provide a oneshot [docker-compose file]() for development purposes. This has been tested with the latest version of docker desktop and docker-compose. 

1) Clone the [conda-store-ui](https://github.com/Quansight/conda-store-ui.git) repository.

2) Start the docker-compose stack.

```bash
cd conda-store-ui
docker compose up --build
```

3) Access conda-store-ui at [localhost](http://localhost/)

4) Login by locating the login icon, and clicking on it. The default login combination is `username/password`. 

## Local Installation

**Note** that for installing from source, you will stil need a running conda-store somewhere. The easiest way to do this locally is by running conda-store with docker-compose. 

1) Clone the [conda-store-ui](https://github.com/Quansight/conda-store-ui.git) repository.

2) If you have an instance of conda-store you plan to connect to, skip this step. Otherwise, start it using docker.

```bash
cd conda-store-ui
git clone https://github.com/Quansight/conda-store-ui.git
cd conda-store-ui
docker-compose -f docker-compose-dev.yml up --build
```

3) Create a conda environment with yarn:

```bash
conda create -n "conda-store-ui"
conda activate "conda-store-ui"
conda install -c conda-forge yarn
```

4) Create a configuration file for the frontend. Refer to the Configuration section.

5) From the root of the repository, build and install:

```bash
yarn
yarn run start
```
