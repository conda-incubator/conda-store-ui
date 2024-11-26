# conda-store-ui

<div align="center">
  <img src="https://raw.githubusercontent.com/conda-incubator/conda-store/main/docusaurus-docs/community/images/logos/conda-store-logo-vertical-lockup.svg" alt="conda-store logo" width="30%">
</div>

---

| Information | Links                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project     | [![License](https://img.shields.io/badge/License-BSD%203--Clause-gray.svg?&colorB=298642&style=flat.svg)](https://opensource.org/licenses/BSD-3-Clause) [![conda-store documentation](https://img.shields.io/badge/conda--store-documentation%20📖-gray.svg?&colorB=298642&style=flat.svg)][conda-store-docs] [![conda-store-ui documentation](https://img.shields.io/badge/conda--store--UI-documentation%20📖-gray.svg?&colorB=298642&style=flat.svg)][conda-store-ui-docs] |
| Workflows   | ![GitHub Workflow Status (with event) - Release](https://img.shields.io/github/actions/workflow/status/conda-incubator/conda-store-ui/release.yml?event=push&label=Release&logo=GitHub) ![GitHub Workflow Status - GitHub pages](https://img.shields.io/github/actions/workflow/status/conda-incubator/conda-store-ui/pages.yml?label=Docs&logo=GitHub)                                                                                                                       |
| Releases    | ![GitHub release (the latest by date)](https://img.shields.io/github/v/release/conda-incubator/conda-store-ui?logo=Github) ![npm release version](https://img.shields.io/npm/v/@conda-store/conda-store-ui?label=release&logo=npm)                                                                                                                                                                                                                                            |

---

## About

conda-store-ui is an add-on Graphical User Interface to [conda-store][conda-store-repo].
If you're looking for the JupyterLab Extension, you can find it at [jupyterlab-conda-store][jupyterlab-conda-store-repo]

## Get Started 💻

To learn how to use conda-store-ui alongside conda-store, please visit [the conda-store-ui documentation][conda-store-ui-docs].

## Development 👩🏻‍💻

Please refer to the `conda-store` docs: [Contribute code - conda-store-ui](https://conda.store/community/contribute/contribute-code#conda-store-ui).

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

```
conda env create -f environment_dev.yml
conda activate cs-ui-dev-env
playwright install chromium
cp .env.example .env
corepack enable
yarn install --immutable
yarn build
```

Line by line, here's what the commands above do:

1. Create Conda environment
2. Activate Conda environment
3. Install Playwright-usable browser
4. Copy environment variables
5. Use Corepack to set Yarn to correct version
6. Use Yarn to install JavaScript dependencies
7. Build app

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


## Version specification

We follow a [style of CalVer](https://conda.store/community/maintenance/release/#calver-details).
