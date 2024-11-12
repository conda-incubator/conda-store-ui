import { buildDatetimeStatus } from "../../src/utils/helpers";
import { BUILD } from "../testutils";

const generateBuild = (status: string) => ({
  ...BUILD,
  status
});

describe("buildDatetimeStatus", () => {
  it("should indicate completed build", () => {
    const build = generateBuild("COMPLETED");
    expect(buildDatetimeStatus(build, build.id)).toMatch(/Active$/);
    expect(buildDatetimeStatus(build, -1)).toMatch(/(?<!Active.*)Available$/);
  });

  it("should indicate building build", () => {
    const build = generateBuild("BUILDING");
    expect(buildDatetimeStatus(build, build.id)).toMatch(/Active - Building$/);
    expect(buildDatetimeStatus(build, -1)).toMatch(/(?<!Active.*)Building$/);
  });

  it("should indicate queued build", () => {
    const build = generateBuild("QUEUED");
    expect(buildDatetimeStatus(build, build.id)).toMatch(/Active - Queued$/);
    expect(buildDatetimeStatus(build, -1)).toMatch(/(?<!Active.*)Queued$/);
  });

  it("should indicate failed build", () => {
    const build = generateBuild("FAILED");
    expect(buildDatetimeStatus(build, build.id)).toMatch(/Active - Failed$/);
    expect(buildDatetimeStatus(build, -1)).toMatch(/(?<!Active.*)Failed$/);
  });

  it("should indicate canceled build", () => {
    const build = generateBuild("CANCELED");
    expect(buildDatetimeStatus(build, build.id)).toMatch(/Active - Canceled$/);
    expect(buildDatetimeStatus(build, -1)).toMatch(/(?<!Active.*)Canceled$/);
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
