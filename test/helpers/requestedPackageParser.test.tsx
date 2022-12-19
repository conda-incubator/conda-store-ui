import {
  requestedPackageParser,
  requestedPackagesMapper
} from "../../src/utils/helpers";

const PACKAGES = ["numpy>=4.7", "asttokens"];

describe("requestedPackageParser", () => {
  it("should return package info", () => {
    const parsedPackage = requestedPackageParser(PACKAGES[0]);

    expect(parsedPackage).toEqual({
      name: "numpy",
      version: "4.7",
      constraint: ">="
    });
  });

  it("should return empty version and constrain info", () => {
    const parsedPackage = requestedPackageParser(PACKAGES[1]);

    expect(parsedPackage).toEqual({
      name: "asttokens",
      version: "",
      constraint: "latest"
    });
  });

  it("should map any package", () => {
    const parsedPackages = requestedPackagesMapper([
      ...PACKAGES,
      "dumpy==1.0",
      {
        pip: []
      }
    ]);

    expect(parsedPackages).toEqual([
      "numpy>=4.7",
      "asttokens",
      "dumpy=1.0",
      { pip: [] }
    ]);
  });
});
