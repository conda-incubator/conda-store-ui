import React from "react";
import { render, screen } from "@testing-library/react";
import { ArtifactList } from "../../src/features/artifacts/components";
import { mockTheme } from "../testutils";
import { PrefContext, prefDefault } from "../../src/preferences";

const ARTIFACTS = [
  {
    name: "Show lockfile",
    route: "/api/v1/build/1/lockfile/"
  }
];

describe("<ArtifactList />", () => {
  it("should render component", () => {
    render(mockTheme(<ArtifactList artifacts={ARTIFACTS} />));
    expect(screen.getByText("Logs and Artifacts")).toBeInTheDocument();
    expect(screen.getByText("Show lockfile")).toBeVisible();
  });

  for (const [apiUrl, expectedArtifactUrl] of [
    [
      "http://localhost:8080/conda-store/",
      "http://localhost:8080/conda-store/api/v1/build/1/lockfile/"
    ],
    [
      "http://localhost:8080/conda-store",
      "http://localhost:8080/conda-store/api/v1/build/1/lockfile/"
    ],
    ["http://localhost:8080", "http://localhost:8080/api/v1/build/1/lockfile/"],
    ["/conda-store", "/conda-store/api/v1/build/1/lockfile/"],
    ["/", "/api/v1/build/1/lockfile/"],
    ["", "/api/v1/build/1/lockfile/"]
  ]) {
    describe(`with REACT_APP_API_URL set to "${apiUrl}"`, () => {
      it(`should render expected artifact URL ${expectedArtifactUrl}`, () => {
        render(
          mockTheme(
            <PrefContext.Provider
              value={{
                ...prefDefault,
                apiUrl
              }}
            >
              <ArtifactList artifacts={ARTIFACTS} />
            </PrefContext.Provider>
          )
        );
        expect(screen.getByText("Show lockfile")).toHaveAttribute(
          "href",
          expectedArtifactUrl
        );
      });
    });
  }
});
