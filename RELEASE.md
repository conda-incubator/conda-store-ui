# Manual release process

1. Open a new release issue in the repository, following the [release issue template](../.github/ISSUE_TEMPLATE/release.md).
1. Create a new branch for the release `git checkout -b release-2024.9.1`
1. Clean the branch `git clean -fxdq`
1. Increment the version in `package.json` following our [version specification](https://conda.store/community/maintenance/release/#calver-details)
1. Build the package locally:

   ```bash
   yarn install

   # build the package
   yarn run build

   # for the browser bundle - this will generate a dist directory for the
   # compiled assets, by using the prod target we ensure assets will be
   # optimised accordingly, you can check the contents in the /dist directory
   yarn run webpack:prod bundle

   # pack the bundle
   yarn pack --filename conda-store-ui.tgz

   ```

> [!IMPORTANT]
> You need to be logged in to the `npmjs` registry to publish the package.
> And have access to the `conda-store` npm namespace.

1. Perform a local dry run publish:

   ```bash
   # dry run publish to npmjs
   npm publish --verbose --access public conda-store-ui.tgz --dry-run
   ```

If the dry run looks good, continue with the release checklist items.

## Troubleshooting notes

- If there are issues with the [GitHub Release UI](https://github.com/conda-incubator/conda-store-ui/releases/new), ensure that whatever code you published is checked into git, then tag and push both the commit and the tag:

  ```bash
  # use the same version here as in package.json, but without a leading `v`
  git tag -a YYYY.M.ReleaseNumber

  # push to upstream
  git push && git push --tags
  ```

- In case the [Release GitHub Actions workflow][release-action] fails, publish to npmjs manually. You need access to the [conda-store-ui npm package][cs-ui-npm] for this:

  ```bash
  # you will need to login first - and have access to the npm namespace
  # npm login --registry https://registry.npmjs.org --scope @conda-store-ui

  # publish release to npmjs
  npm publish --verbose --access public conda-store-ui.tgz
  ```

<!-- Link -->

[cs-ui-npm]: https://www.npmjs.com/package/@conda-store/conda-store-ui
[release-action]: https://github.com/conda-incubator/conda-store-ui/blob/main/.github/workflows/release.yml
