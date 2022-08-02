import React from "react";
import { render, screen } from "@testing-library/react";
import { ArtifactsList } from "../src/features/artifacts/components/ArtifactsList";
import { mockTheme } from "./testutils";

const artifactsList = [
  {
    name: "Link to lockfile",
    route: "/api/v1/build/{build_id}/lockfile/"
  },
  {
    name: "Link to yml file",
    route: "/api/v1/build/{build_id}/yaml/"
  }
];

describe("<ArtifactsList />", () => {
  it("should render component", () => {
    render(mockTheme(<ArtifactsList artifacts={artifactsList} />));

    expect(screen.getByText("Logs and Artifacts")).toBeInTheDocument();

    expect(screen.getByText(`${artifactsList[0].name}`)).toBeVisible();
    expect(screen.getByText(`${artifactsList[0].name}`)).toHaveAttribute(
      "href",
      "/api/v1/build/{build_id}/lockfile/"
    );
    expect(screen.getByText(`${artifactsList[1].name}`)).toBeVisible();
    expect(screen.getByText(`${artifactsList[1].name}`)).toHaveAttribute(
      "href",
      "/api/v1/build/{build_id}/yaml/"
    );
  });
});
