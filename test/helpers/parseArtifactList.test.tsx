import { parseArtifacts } from "../../src/utils/helpers";

describe("parseArtifacts", () => {
  it("should return the artifact list if they are related", () => {
    const artifacts = ["LOCKFILE", "DOCKER_MANIFEST", "UNKWON"];
    const parsedArtifacts = parseArtifacts(artifacts);
    expect(parsedArtifacts).toEqual(["LOCKFILE", "DOCKER_MANIFEST"]);
  });

  it("should return an empty array if input value has not a lenght", () => {
    const parsedArtifacts = parseArtifacts([]);
    expect(parsedArtifacts).toEqual([]);
  });
});
