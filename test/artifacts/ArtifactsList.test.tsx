import React from "react";
import { render, screen } from "@testing-library/react";
import { ArtifactList } from "../../src/features/artifacts/components";
import { mockTheme } from "../testutils";

const ARTIFACTS = [
  {
    name: "Link to lockfile",
    route: "/api/v1/build/1/lockfile/"
  }
];

describe("<ArtifactList />", () => {
  it("should render component", () => {
    render(
      mockTheme(<ArtifactList artifacts={ARTIFACTS} showArtifacts={true} />)
    );

    expect(screen.getByText("Logs and Artifacts")).toBeInTheDocument();
    expect(screen.getByText("Link to lockfile")).toBeVisible();
    expect(screen.getByText("Link to lockfile")).toHaveAttribute(
      "href",
      "http://localhost:5000/api/v1/build/1/lockfile/"
    );
  });
});
