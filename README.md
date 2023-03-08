# conda-store-ui
Graphical User Interface for [conda-store](https://github.com/Quansight/conda-store) 

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Quansight/conda-store-ui/build.yml?label=Build&logo=GitHub)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/Quansight/conda-store-ui/deploy.yml?event=push&label=Deploy&logo=GitHub)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Quansight/conda-store-ui/pages.yml?label=Docs&logo=GitHub)

![GitHub release (latest by date)](https://img.shields.io/github/v/release/Quansight/conda-store-ui?logo=Github)
![npm (scoped)](https://img.shields.io/npm/v/@conda-store/conda-store-ui?label=release&logo=npm)
-------------------

## Get Started

To learn how to use conda-store-ui alongisde conda-store, please visit our [documentation](https://quansight.github.io/conda-store-ui/).

## Related Work

conda-store-ui is an addon to [conda-store](https://github.com/Quansight/conda-store). If you're looking for the JupyterLab Extension, you can find it at [conda-store-jupyterlab](https://github.com/Quansight/conda-store).

## Developing

For developing this application, we use Docker Compose for setting up the infrastructure, and conda as the package manager for node/yarn. Note
that you can use any method you wish to use yarn/nodejs. 

1) Clone this repo and from root, start docker compose:

```bash
git clone https://github.com/Quansight/conda-store-ui.git
cd conda-store-ui
docker-compose -f docker-compose-dev.yml up --build 
```

2) Then, install yarn/node.js.

**Note** Skip this if you are planning to use a local install of yarn/nodejs

```bash
conda create --name conda-store-ui
conda activate conda-store-ui
conda install -c conda-forge yarn nodejs==16.14.2
```

3) Finally, start the application

```bash
yarn install
yarn run build
yarn run start
```

If you encounter issues, please take a look at Configuration (available in the documentation).

## Releasing

In order to create a new version of this package, follow these steps:

* Bump the version number in `package.json`

* Go to the releases tab, and create a new release. Note that the release version tag _must_ match the new version from package.json

* Wait for actions to execute and the new package will be uploaded to `npm`

Latest Release: https://libraries.io/npm/@conda-store%2Fconda-store-ui

## License

conda-store-ui is developed under the [BSD-3 LICENSE](./LICENSE).
