# conda-store-ui

<div align="center">
  <img src="https://raw.githubusercontent.com/conda-incubator/conda-store/main/docs/_static/images/conda-store-logo-vertical-lockup.svg" alt="conda-store logo" width="30%">
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

## Get Started

To learn how to use conda-store-ui alongside conda-store, please visit [the conda-store-ui documentation][conda-store-ui-docs].

## Development

### Setting up the development environment

We use [Docker Compose](https://docs.docker.com/compose/) to set up the infrastructure and recommend using `conda` as the package manager for NodeJS and yarn.

You will need to have the following installed:

- [Docker compose](https://docs.docker.com/compose/install/)
- conda or mamba

To get started:

1. Clone this repo and from the root of the directory, start Docker compose:

   ```bash
   git clone https://github.com/conda-incubator/conda-store-ui.git
   cd conda-store-ui
   docker-compose -f docker-compose-dev.yml up --build
   ```

2. Install yarn and NodeJS with conda:

   > [!NOTE]
   > Skip this if you are planning to use a local installation of yarn and NodeJS

   ```bash
   conda env create -f environment_dev.yml

   # activate the newly created environment
   conda activate cs-ui-dev-env

   ```

3. Finally, start the conda-store-ui application:

   ```bash
   # install the dependencies
   yarn install
   # build and start the application
   yarn run build
   yarn run start
   ```

   once completed, you should be able to access the application at [http://localhost:8000/](http://localhost:8000/)

> [!IMPORTANT]
> When compiling the application for development you will need to set several environment variables.
> Refer to the [Configuration documentation](https://conda-incubator.github.io/conda-store-ui/?path=/docs/docs-configuration--page) for more information.

### Making a release

To create a new version of this package, follow these steps:

<!-- TODO: need to link to CalVer/release docs -->

1. Bump the version number in `package.json` (we use CalVer: `YYYY.MM.releaseNumber` starting with `releaseNumber=1`)
2. [Start a new GitHub release](https://github.com/conda-incubator/conda-store-ui/releases/new)
   - Call the release the current version, e.g. `2023.9.1`
   - In the **`Choose a Tag:`** dropdown, type in the release name (e.g., `2023.9.1`) and click "Create new tag"
   - Add the release notes in the text field [^github-activity]
3. Confirm that the release completed successfully by checking the [GitHub Actions page](https://github.com/conda-incubator/conda-store-ui/actions). Once completed, a new release will be available at [npm - @conda-store/conda-store-ui](https://libraries.io/npm/@conda-store%2Fconda-store-ui)

[^github-activity]: If you wish, use [`github-activity` to generate a Changelog](https://github.com/choldgraf/github-activity), e.g. `github-activity conda-incubator/conda-store-ui --since 2023.9.1 --until 2023.10.1 --auth <GH personal access token>`

## Code of Conduct

To guarantee a welcoming and friendly community, we require all community members to follow our [Code of Conduct](https://github.com/conda-incubator/governance/blob/main/CODE_OF_CONDUCT.md).

## License

conda-store-ui is developed under the [BSD-3 LICENSE](./LICENSE).

<!-- reusable links -->

[conda-store-docs]: https://conda.store/en/latest/
[conda-store-ui-docs]: https://conda-incubator.github.io/conda-store-ui/?path=/story/welcome--page
[conda-store-repo]: https://github.com/conda-incubator/conda-store
[jupyterlab-conda-store-repo]: https://github.com/conda-incubator/jupyterlab-conda-store
