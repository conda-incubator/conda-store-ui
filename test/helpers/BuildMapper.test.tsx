import { buildMapper } from "../../src/utils/helpers";
import { BUILD } from "../testutils";

const generateBuild = (status: string) => [
  {
    ...BUILD,
    status
  }
];
describe("buildMapper", () => {
  it("should return an active build", () => {
    const builds = generateBuild("COMPLETED");
    const [mappedBuild] = buildMapper(builds, 1);
    expect(mappedBuild.name).toContain("Active");
  });

  it("should return build", () => {
    const builds = generateBuild("BUILDING");
    const [mappedBuild] = buildMapper(builds, 2);
    expect(mappedBuild.name).toContain("Building");
  });

  it("should return queued build", () => {
    const builds = generateBuild("QUEUED");
    const [mappedBuild] = buildMapper(builds, 2);
    expect(mappedBuild.name).toContain("Queued");
  });

  it("should return completed build", () => {
    const builds = generateBuild("COMPLETED");
    const [mappedBuild] = buildMapper(builds, 2);
    expect(mappedBuild.name).toContain("Available");
  });

  it("should return failed build", () => {
    const builds = generateBuild("FAILED");
    const [mappedBuild] = buildMapper(builds, 2);
    expect(mappedBuild.name).toContain("Failed");
  });

  it("should use the scheduled_on date if the ended_on prop is null", () => {
    const [mappedBuild] = buildMapper(
      [
        {
          ...BUILD,
          status: "FAILED",
          ended_on: null
        }
      ],
      2
    );
    expect(mappedBuild.name).toContain("November 8th, 2022 - 9:28 AM - Failed");
  });
});
