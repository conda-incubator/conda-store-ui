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

Before setting up conda-store ui, you must prepare your environment. 

We use [Docker Compose](https://docs.docker.com/compose/) to set up the infrastructure before starting ensure that you have docker-compose installed. If you need to install docker-compose, please see their [installlation documentation](https://docs.docker.com/compose/install/)

1. Clone the [conda-store-ui](https://github.com/conda-incubator/conda-store-ui.git) repository.
2. Copy `.env.example` to `.env`. All default settings should work, but if you want to test against a different version of conda-store-server, you can specify if in the `.env` file by setting the `CONDA_STORE_SERVER_VERSION` variable to the desired version. Refer to the [Configuration documentation](https://conda-incubator.github.io/conda-store-ui/?path=/docs/docs-configuration--page) for more information on the `.env` file.

### Local Development with conda-store-ui running in Docker 🐳

Running conda-store-ui in Docker is the most straightforward way to set up your local development environment.

1. Run `yarn run start:docker` to start the entire development stack.
2. Open you local browser and go to [http://localhost:8000](http://localhost:8000) so see conda-store-ui.
3. You can then log in using the default username of `username` and default password of `password`.

Hot reloading is enabled, so when you make changes to source files, your browser will reload and reflect the changes.

### Local Development without running conda-store-ui in Docker 💻

This setup still uses Docker for supporting services but runs conda-store-ui locally.

#### Set up your environment

This project uses [Conda](https://conda.io) for package management. To set up Conda, please see their [installation documentation](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html).

1. Change to the project root ` cd conda-store-ui`
2. From the project root create the conda environment `conda env create -f environment_dev.yml`
3. Activate the development environment `conda activate cs-ui-dev-env`
4. Install yarn dependencies `yarn install`

#### Run the application

1. Run `yarn run start` and wait for the application to finish starting up
2. Open you local browser and go to [http://localhost:8000](http://localhost:8000) so see conda-store-ui.
3. You can then log in using the default username of `username` and default password of `password`.

Hot reloading is enabled, so when you make changes to source files, your browser will reload and reflect the changes.

### Making a release 🚀

To create a new version of this package, follow these steps:

1. Bump the version number in `package.json` (we use CalVer: `YYYY.MM.releaseNumber` starting with `releaseNumber=1`)
2. [Start a new GitHub release](https://github.com/conda-incubator/conda-store-ui/releases/new)
   - Call the release the current version, e.g. `2023.9.1`
   - In the **`Choose a Tag:`** dropdown, type in the release name (e.g., `2023.9.1`) and click "Create new tag"
   - Add the release notes in the text field [^github-activity]
3. Confirm that the release completed successfully by checking the [GitHub Actions page](https://github.com/conda-incubator/conda-store-ui/actions). Once completed, a new release will be available at [npm - @conda-store/conda-store-ui](https://libraries.io/npm/@conda-store%2Fconda-store-ui)

🔗 You can find more details about out release process and versioning approach in our [Maintenance docs](https://conda.store/community/maintenance/release).

[^github-activity]: If you wish, use [`github-activity` to generate a Changelog](https://github.com/choldgraf/github-activity), e.g. `github-activity conda-incubator/conda-store-ui --since 2023.9.1 --until 2023.10.1 --auth <GH personal access token>`

## Code of Conduct 🤝

To guarantee a welcoming and friendly community, we require all community members to follow our [Code of Conduct](https://github.com/conda-incubator/governance/blob/main/CODE_OF_CONDUCT.md).

## License 📃

conda-store-ui is developed under the [BSD-3 LICENSE](./LICENSE).

<!-- reusable links -->

[conda-store-docs]: https://conda.store/en/latest/
[conda-store-ui-docs]: https://conda-incubator.github.io/conda-store-ui/?path=/story/welcome--page
[conda-store-repo]: https://github.com/conda-incubator/conda-store
[jupyterlab-conda-store-repo]: https://github.com/conda-incubator/jupyterlab-conda-store
