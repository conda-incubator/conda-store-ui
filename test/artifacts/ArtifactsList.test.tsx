import React from "react";
import { render, screen } from "@testing-library/react";
import { ArtifactList } from "../../src/features/artifacts/components";
import { mockTheme } from "../testutils";
import { prefGlobal, prefDefault } from "../../src/preferences";

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

    expect(prefGlobal.apiUrl).toBe("http://localhost:8080/conda-store/");
    expect(screen.getByText("Show lockfile")).toHaveAttribute(
      "href",
      "http://localhost:8080/conda-store/api/v1/build/1/lockfile/"
    );
  });

  it("should render correct URL if API base url lacks trailing slash", () => {
    prefGlobal.set({
      ...prefDefault,
      apiUrl: "http://localhost:8080/conda-store"
    });

    render(mockTheme(<ArtifactList artifacts={ARTIFACTS} />));
    expect(screen.getByText("Show lockfile")).toHaveAttribute(
      "href",
      "http://localhost:8080/conda-store/api/v1/build/1/lockfile/"
    );
  });
});
