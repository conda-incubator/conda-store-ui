# conda-store-ui

![GitHub Workflow Status - Build](https://img.shields.io/github/actions/workflow/status/conda-incubator/conda-store-ui/build.yml?label=Build&logo=GitHub)
![GitHub Workflow Status (with event) - Release](https://img.shields.io/github/actions/workflow/status/conda-incubator/conda-store-ui/release.yml?event=push&label=Deploy&logo=GitHub)
![GitHub Workflow Status - Gh pages](https://img.shields.io/github/actions/workflow/status/conda-incubator/conda-store-ui/pages.yml?label=Docs&logo=GitHub)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/conda-incubator/conda-store-ui?logo=Github)
![npm release version](https://img.shields.io/npm/v/@conda-store/conda-store-ui?label=release&logo=npm)

---

## About

conda-store-ui is an add-on Graphical User Interface to [conda-store](https://github.com/conda-incubator/conda-store).
If you're looking for the JupyterLab Extension, you can find it at [jupyterlab-conda-store](https://github.com/conda-incubator/jupyterlab-conda-store).

## Get Started

To learn how to use conda-store-ui alongside conda-store, please visit our [documentation](https://conda-incubator.github.io/conda-store-ui/).

## Development

### Setting up the development environment

We use [Docker Compose](https://docs.docker.com/compose/) to set up the infrastructure and conda as the package manager for node/yarn. Note
that you can use any method you wish to use yarn/nodejs.

1. Clone this repo and from root, start Docker compose:

   ```bash
   git clone https://github.com/conda-incubator/conda-store-ui.git
   cd conda-store-ui
   docker-compose -f docker-compose-dev.yml up --build
   ```

2. Install yarn and NodeJS.

   > **Note**
   > Skip this if you are planning to use a local installation of yarn and NodeJS

   ```bash
   conda create --name conda-store-ui
   conda activate conda-store-ui
   conda install -c conda-forge yarn nodejs==16.14.2
   ```

3. Finally, start the application

   ```bash
   yarn install
   yarn run build
   yarn run start
   ```

If you encounter issues, please take a look at Configuration (available in the documentation).

### Making a release

In order to create a new version of this package, follow these steps:

* Bump the version number in `package.json`

* Go to the releases tab, and create a new release. Note that the release version tag _must_ match the new version from package.json

* Wait for actions to execute and the new package will be uploaded to `npm`

Latest Release: https://libraries.io/npm/@conda-store%2Fconda-store-ui

## Code of Conduct

To guarantee a welcoming and friendly community, we require all community members to follow our [Code of Conduct](https://github.com/conda-incubator/governance/blob/main/CODE_OF_CONDUCT.md).

## License

conda-store-ui is developed under the [BSD-3 LICENSE](./LICENSE).
