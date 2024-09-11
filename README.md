# conda-store-ui

<div align="center">
  <img src="https://raw.githubusercontent.com/conda-incubator/conda-store/main/docusaurus-docs/community/images/logos/conda-store-logo-vertical-lockup.svg" alt="conda-store logo" width="30%">
</div>

---

| Information | Links                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project     | [![License](https://img.shields.io/badge/License-BSD%203--Clause-gray.svg?&colorB=298642&style=flat.svg)](https://opensource.org/licenses/BSD-3-Clause) [![conda-store documentation](https://img.shields.io/badge/conda--store-documentation%20📖-gray.svg?&colorB=298642&style=flat.svg)][conda-store-docs] [![conda-store-ui documentation](https://img.shields.io/badge/conda--store--UI-documentation%20📖-gray.svg?&colorB=298642&style=flat.svg)][conda-store-ui-docs]                                     |
| Wofklows    | ![GitHub Workflow Status - Build](https://img.shields.io/github/actions/workflow/status/conda-incubator/conda-store-ui/build.yml?label=Build&logo=GitHub) ![GitHub Workflow Status (with event) - Release](https://img.shields.io/github/actions/workflow/status/conda-incubator/conda-store-ui/release.yml?event=push&label=Release&logo=GitHub) ![GitHub Workflow Status - GitHub pages](https://img.shields.io/github/actions/workflow/status/conda-incubator/conda-store-ui/pages.yml?label=Docs&logo=GitHub) |
| Releases    | ![GitHub release (the latest by date)](https://img.shields.io/github/v/release/conda-incubator/conda-store-ui?logo=Github) ![npm release version](https://img.shields.io/npm/v/@conda-store/conda-store-ui?label=release&logo=npm)                                                                                                                                                                                                                                                                                |

---

## About

conda-store-ui is an add-on Graphical User Interface to [conda-store][conda-store-repo].
If you're looking for the JupyterLab Extension, you can find it at [jupyterlab-conda-store][jupyterlab-conda-store-repo]

## Get Started 💻

To learn how to use conda-store-ui alongside conda-store, please visit [the conda-store-ui documentation][conda-store-ui-docs].

## Development 👩🏻‍💻

To get started with conda-store-ui development, there are a couple of options, depending on the type of changes you are working on.
This guide will help you to set up your local development environment.

### Prerequisites 📋

Before setting up conda-store-ui, you must prepare your environment.

We use [Docker Compose](https://docs.docker.com/compose/) to set up the infrastructure. Before starting ensure that you
have Docker Compose installed.
If you need to install Docker Compose, please see their [installation documentation](https://docs.docker.com/compose/install/)

1. Clone the [conda-store-ui](https://github.com/conda-incubator/conda-store-ui.git) repository.
2. Copy `.env.example` to `.env`. All default settings should work, but if you want to test against a different version
   of conda-store-server, you can specify if in the `.env` file by setting the `CONDA_STORE_SERVER_VERSION` variable to
   the desired version.
   Refer to the [Configuration documentation](https://conda.store/conda-store-ui/how-tos/configure-ui/) for more
   information on the `.env` file.

### Local Development with conda-store-ui running in Docker 🐳

Running conda-store-ui in Docker is the most straightforward way to set up your local development environment.

1. Run `yarn install`. This will download the needed JavaScript dependencies into a directory named `node_modules/`.
   This directory will later be copied into the `conda-store-ui` Docker container for use at runtime by the Conda Store
   UI app.
2. Run `yarn run start:docker` to start the entire development stack.
3. Open you local browser and go to [http://localhost:8000](http://localhost:8000) so see conda-store-ui.
4. You can then log in using the default username of `username` and default password of `password`.

Hot reloading is enabled, so when you make changes to source files, your browser will reload and reflect the changes.

### Local Development without running conda-store-ui in Docker 💻

This setup still uses Docker for supporting services but runs conda-store-ui locally.

#### Set up your environment

This project uses [conda](https://conda.io) for package management.
To set up conda, please see their [installation documentation](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html).

1. Change to the project root `cd conda-store-ui`
2. From the project root create the conda environment `conda env create -f environment_dev.yml`
3. Activate the development environment `conda activate cs-ui-dev-env`
4. Install yarn dependencies `yarn install`

#### Run the application

1. Run `yarn run start` and wait for the application to finish starting up
2. Open you local browser and go to [http://localhost:8000](http://localhost:8000) so see conda-store-ui.
3. You can then log in using the default username of `username` and default password of `password`.

Hot reloading is enabled, so when you make changes to source files, your browser will reload and reflect the changes.

### Making a release 🚀

To create a new version of this package: the release captain will open an issue with the `release` template and follow
the steps outlined in the issue.

🔗 You can find more details about out release process and versioning approach in our
[Maintenance docs](https://conda.store/community/maintenance/release).

### Running Tests

This repo contains two types of tests: Jest and Playwright

#### Jest tests

To run the Jest tests, run the following command:

```sh
yarn test
```

#### Playwright tests

Steps to install and set up:

1. Create Conda environment
   ```sh
   conda env create -f environment_dev.yml
   ```
2. Activate Conda environment
   ```sh
   conda activate cs-ui-dev-env
   ```
3. Install Playwright-usable browser
   ```sh
   playwright install chromium
   ```
4. Copy environment variables
   ```sh
   cp .env.example .env
   ```
5. Install JavaScript dependencies
   ```sh
   yarn install --immutable
   ```
6. Build app
   ```sh
   yarn build
   ```

To run the tests, you will need to run the following commands in two separate terminal windows
or tabs:

1. In the first terminal window/tab, enter the following:
   ```sh
   conda activate cs-ui-dev-env
   yarn start
   ```
2. Wait for server to start (you'll know it's ready when it says "webpack 5.xx.x
   compiled successfully"). Open a **new terminal window or tab** and enter the
   following:
   ```sh
   conda activate cs-ui-dev-env
   pytest
   ```

If you need to debug, try replacing the last command with:

```sh
PWDEBUG=1 pytest
```

> [!NOTE]
> PW stands for Playwright. `PWDEBUG=1` puts [Playwright in debug mode](https://playwright.dev/python/docs/debug).

## Code of Conduct 🤝

To guarantee a welcoming and friendly community, we require all community members to follow our [Code of Conduct](https://github.com/conda-incubator/governance/blob/main/CODE_OF_CONDUCT.md).

## License 📃

conda-store-ui is developed under the [BSD-3 LICENSE](./LICENSE).

<!-- reusable links -->

[conda-store-docs]: https://conda.store/
[conda-store-ui-docs]: https://conda-incubator.github.io/conda-store-ui/?path=/docs/welcome--docs
[conda-store-repo]: https://github.com/conda-incubator/conda-store
[jupyterlab-conda-store-repo]: https://github.com/conda-incubator/jupyterlab-conda-store
