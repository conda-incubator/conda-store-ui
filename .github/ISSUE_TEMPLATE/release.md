---
name: "New release 🏷 [maintainers only]"
about: "Start a new conda-store-ui release"
title: "[REL] - <release number>"
labels: ["release 🏷"]
---

<!-- These steps should be taken to create a new release!
**Double-check for quality control** -->

## Release details

Scheduled release date - <yyyy/mm/dd>

Release captain responsible - <@gh_username>

---

### 1. Pre-flight checks

- [ ] Ensure there are no [open issues with a `block-release ⛔️` label](https://github.com/conda-incubator/conda-store-ui/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22block-release+%E2%9B%94%EF%B8%8F%22)

### 2. Prepare the codebase for a new release

- [ ] Create a new git branch for the release `git checkout -b release-2024.9.1`
  - [ ] Prepare the branch just in case `git clean -fxdq`
- [ ] Bump `conda-store-ui` version in `package.json`
- [ ] Follow the manual release instructions in the `Release.md` file (do not make the release yet!)
- [ ] Make a release commit: `git commit -m 'REL - 2024.9.1'`
- [ ] Push the release (REL) commit
- [ ] If a **release candidate** is needed, tick this box when we're ready for a full release.

### 3. Make the release

- [ ] [Start a new GitHub release](https://github.com/conda-incubator/conda-store-ui/releases/new)
  - Call the release the current version, e.g. `2023.9.1`
  - In the **`Choose a Tag:`** dropdown, type in the release name (e.g., `2023.9.1`) and click "Create new tag"
  - In the **`Target:`** dropdown, pin it to the release commit you've recently pushed.
  - Add release notes in the field below [^github-activity].
- [ ] Confirm that the release completed
  - [The `release` GitHub action job](https://github.com/conda-incubator/conda-store-ui/blob/main/.github/workflows/release.yml) has been completed successfully in the [actions tab](https://github.com/conda-incubator/conda-store-ui/actions).
- [ ] Once the release is completed open a PR to adjust the `version` in `package.json` to the next release-dev (e.g., `2023.9.1-dev`)
- [ ] Celebrate, you're done! 🎉

[^github-activity]: If you wish, use [`github-activity` to generate a changelog](https://github.com/choldgraf/github-activity), e.g. `github-activity conda-incubator/conda-store --since 2023.9.1 --until 2023.10.1`.
