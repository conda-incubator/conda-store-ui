# Installation Instructions

The easiest way to install conda-store-ui is from source. However, you can still install conda-store-ui with docker, which provides an alternative.

## Source Installation

1) Clone the [conda-store-ui]() repository.

2) Create a conda environment with yarn:

**Note** The application is built using `yarn`, so any package manager with yarn installed works.

```bash
conda create -n "conda-store-ui"
conda activate "conda-store-ui"
conda install -c conda-forge yarn
```

3) From the root of the repository, build and install:

```bash
yarn
yarn run build
yarn run start
```

...and off you go! For advanced configuration options, go here. 
