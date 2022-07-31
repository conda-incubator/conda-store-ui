import React from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { ArtifactList } from "../src/features/artifacts/components/ArtifactList";
import { mockTheme } from "./testutils";

const artifactList = [
  {
    name: "Link to lockfile",
    route: "/api/v1/build/{build_id}/lockfile/"
  },
  {
    name: "Link to yml file",
    route: "/api/v1/build/{build_id}/yaml/"
  }
];

describe("<ArtifactList />", () => {
  it("should render component", () => {
    render(mockTheme(<ArtifactList artifacts={artifactList} />));

    expect(screen.getByText("Logs and Artifacts")).toBeInTheDocument();

    expect(screen.getByText(`${artifactList[0].name}`)).toBeVisible();
    expect(screen.getByText(`${artifactList[0].name}`)).toHaveAttribute(
      "href",
      "/api/v1/build/{build_id}/lockfile/"
    );
    expect(screen.getByText(`${artifactList[1].name}`)).toBeVisible();
    expect(screen.getByText(`${artifactList[1].name}`)).toHaveAttribute(
      "href",
      "/api/v1/build/{build_id}/yaml/"
    );
  });
});
