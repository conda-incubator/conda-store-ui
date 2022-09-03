import React from "react";
import { render, screen } from "@testing-library/react";
import { ArtifactList } from "../src/features/artifacts/components";
import { mockTheme } from "./testutils";

const build_id = 1;

describe("<ArtifactList />", () => {
  it("should render component", () => {
    render(mockTheme(<ArtifactList build_id={build_id} />));

    expect(screen.getByText("Logs and Artifacts")).toBeInTheDocument();

    expect(screen.getByText("Link to lockfile")).toBeVisible();
    expect(screen.getByText("Link to lockfile")).toHaveAttribute(
      "href",
      "/api/v1/build/1/lockfile/"
    );
    expect(screen.getByText("Link to yml file")).toBeVisible();
    expect(screen.getByText("Link to yml file")).toHaveAttribute(
      "href",
      "/api/v1/build/1/yaml/"
    );
  });
});
