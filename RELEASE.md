# manual release

1. increment version in package.json
2. run
  ```bash
  # do a dry run first to check
  npm publish --access public --dry-run

  # the real publish-to-npmjs command
  npm publish --access public
  ```
3. ensure that whatever code you just publish is checked into git, then tag and push the commit and tag
  ```bash
  # use the same version here as in package.json, but with a leading `v`
  git tag -a vx.y.z

  # push both any unpushed commits and the new tag
  git push && git push --tags
  ```
Creating the tag will automatically create a release on Github (see `.github/workflows/release.yml`)