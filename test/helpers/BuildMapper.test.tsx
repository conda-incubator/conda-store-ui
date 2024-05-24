import { buildDatetimeStatus } from "../../src/utils/helpers";
import { BUILD } from "../testutils";

const generateBuild = (status: string) => ({
  ...BUILD,
  status
});

describe("buildDatetimeStatus", () => {
  it("should return an active build", () => {
    const build = generateBuild("COMPLETED");
    expect(buildDatetimeStatus(build, 1)).toMatch(/Active$/);
  });

  it("should return build", () => {
    const build = generateBuild("BUILDING");
    expect(buildDatetimeStatus(build, 2)).toMatch(/Building$/);
  });

  it("should return queued build", () => {
    const build = generateBuild("QUEUED");
    expect(buildDatetimeStatus(build, 2)).toMatch(/Queued$/);
  });

  it("should return completed build", () => {
    const build = generateBuild("COMPLETED");
    expect(buildDatetimeStatus(build, 2)).toMatch(/Available$/);
  });

  it("should return failed build", () => {
    const build = generateBuild("FAILED");
    expect(buildDatetimeStatus(build, 2)).toMatch(/Failed$/);
  });

  it("should use the scheduled_on date if the ended_on prop is null", () => {
    const datetimeStatus = buildDatetimeStatus(
      {
        ...BUILD,
        status: "FAILED",
        ended_on: null
      },
      2
    );
    expect(datetimeStatus).toContain("November 8th, 2022");
  });
});
