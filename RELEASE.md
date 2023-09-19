# Manual release process

1. Increment version in `package.json`
2. Perform a local dry run build:

   ```bash
   # dry run build
   npm publish --access public --dry-run

   # the real publish-to-npmjs command
   npm publish --access public
   ```

3. Ensure that whatever code you published is checked into git, then tag and push the commit and tag

  ```bash
  # use the same version here as in package.json, but without a leading `v`
  git tag -a YYYY.M.ReleaseNumber

  # push to upstream
  git push && git push --tags
  ```
