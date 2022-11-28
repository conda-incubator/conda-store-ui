import artifactList from "../../src/utils/helpers/artifact";

const CURRENT_BUILD_ID = 1;
const ARTIFACTS_TYPES = ["LOCKFILE", "YAML"];

describe("artifactList", () => {
  it("should return the artifact list", () => {
    const list = artifactList(CURRENT_BUILD_ID, ARTIFACTS_TYPES);
    expect(list).toEqual([
      { name: "Link to lockfile", route: "api/v1/build/1/lockfile/" },
      { name: "Link to yml file", route: "api/v1/build/1/yaml/" }
    ]);
  });

  it("should return an empty array if currentBuildId is not defined", () => {
    const list = artifactList(undefined, ARTIFACTS_TYPES);
    expect(list).toHaveLength(0);
  });
});
