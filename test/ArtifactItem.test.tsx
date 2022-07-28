import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ArtifactItem } from "../src/features/artifacts/components/ArtifactsItem";

describe("<ArtifactItem />", () => {
  it("should render component", () => {
    const artifactItem = [
      {
        name: "Link to lockfile",
        route: "/api/v1/build/{build_id}/lockfile/"
      }
    ];
    render(<ArtifactItem artifact={artifactItem} />);

    expect(
      getByTestId(document.documentElement, "SquareIcon")
    ).toBeInTheDocument();

    expect(screen.getByTestId("SquareIcon")).toHaveStyle({
      marginRight: "12px",
      height: "10px",
      width: "10px",
      color: "rgb(0, 0, 0)"
    });
  });
});
