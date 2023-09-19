# conda-store-ui

<div align="center">
  <img src="https://raw.githubusercontent.com/conda-incubator/conda-store/main/docs/_static/images/conda-store-logo-vertical-lockup.svg" alt="conda-store logo" width="30%">
</div>

---

![GitHub Workflow Status - Build](https://img.shields.io/github/actions/workflow/status/conda-incubator/conda-store-ui/build.yml?label=Build&logo=GitHub)
![GitHub Workflow Status (with event) - Release](https://img.shields.io/github/actions/workflow/status/conda-incubator/conda-store-ui/release.yml?event=push&label=Release&logo=GitHub)
![GitHub Workflow Status - GitHub pages](https://img.shields.io/github/actions/workflow/status/conda-incubator/conda-store-ui/pages.yml?label=Docs&logo=GitHub)
![GitHub release (the latest by date)](https://img.shields.io/github/v/release/conda-incubator/conda-store-ui?logo=Github)
![npm release version](https://img.shields.io/npm/v/@conda-store/conda-store-ui?label=release&logo=npm)

---

## About

conda-store-ui is an add-on Graphical User Interface to [conda-store](https://github.com/conda-incubator/conda-store).
If you're looking for the JupyterLab Extension, you can find it at [jupyterlab-conda-store](https://github.com/conda-incubator/jupyterlab-conda-store).

## Get Started

To learn how to use conda-store-ui alongside conda-store, please visit [the conda-store-ui documentation](https://conda-incubator.github.io/conda-store-ui/).

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

<!-- TODO: need to link to CalVer/release docs -->
1. Bump the version number in `package.json` (we use CalVer: `YYYY-MM-releaseNumber` starting with `releaseNumber=1`)
2. [Start a new GitHub release](https://github.com/conda-incubator/conda-store-ui/releases/new)
    - Call the release the current version, e.g. `2023.9.1`
    - In the **`Choose a Tag:`** dropdown, type in the release name (e.g., `2023.9.1`) and click "Create new tag"
    - Add release notes in the field below[^github-activity]
3. Confirm that the release completed successfully by checking the [GitHub Actions page](https://github.com/conda-incubator/conda-store-ui/actions). Once completed, a new release will be available at [npm - @conda-store/conda-store-ui](https://libraries.io/npm/@conda-store%2Fconda-store-ui)

[^github-activity]: If you wish, use [`github-activity` to generate a changelog](https://github.com/choldgraf/github-activity), eg `github-activity conda-incubator/conda-store-ui --since 2023.9.1 --until 2023.10.1 --auth <GH personal access token>` .

## Code of Conduct

To guarantee a welcoming and friendly community, we require all community members to follow our [Code of Conduct](https://github.com/conda-incubator/governance/blob/main/CODE_OF_CONDUCT.md).

## License

conda-store-ui is developed under the [BSD-3 LICENSE](./LICENSE).
