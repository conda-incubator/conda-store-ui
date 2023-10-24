# Manual release process

1. Create a new branch for the release `git checkout -b release-2023.9.1`
2. Clean the branch `git clean -fxdq`
3. Increment version in `package.json`
4. Build the package locally:

   ```bash
   yarn install

   # build the package
   yarn run build

   # for the browser bundle
   yarn run webpack bundle

   # pack the bundle
   yarn pack --filename conda-store-ui.tgz

   ```

5. Perform a local dry run publish:

   ```bash
   # dry run publish to npmjs
   npm publish --verbose --access public conda-store-ui.tgz --dry-run
   ```

6. If the dry run looks good, publish to npmjs:

   ```bash
   npm publish --verbose --access public conda-store-ui.tgz
   ```

7. Ensure that whatever code you published is checked into git, then tag and push the commit and tag

```bash
# use the same version here as in package.json, but without a leading `v`
git tag -a YYYY.M.ReleaseNumber

# push to upstream
git push && git push --tags
```
