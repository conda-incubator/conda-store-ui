import React from "react";
import { render } from "@testing-library/react";
import { ArtifactItem } from "../../src/features/artifacts/components/ArtifactsItem";

describe("<ArtifactItem />", () => {
  it("should render component", () => {
    const artifactItem = {
      name: "Link to lockfile",
      route: "/api/v1/build/{build_id}/lockfile/"
    };
    const component = render(<ArtifactItem artifact={artifactItem} />);

    expect(component.container).toHaveTextContent(artifactItem.name);
  });
});
