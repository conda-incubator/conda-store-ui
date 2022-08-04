import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { BlockContainer } from "../src/components";

describe("<BlockContainer />", () => {
  let component: RenderResult;
  const title = "Test";

  beforeEach(() => {
    component = render(
      <BlockContainer title={title}>
        <p data-testid="block-container-children">Hello World</p>
      </BlockContainer>
    );
  });

  it("should render", () => {
    const text = component.getByTestId("block-container-title");
    const children = component.getByTestId("block-container-children");

    expect(text).toBeVisible();
    expect(text).toHaveTextContent(title);

    expect(children).toBeVisible();
    expect(children).toHaveTextContent("Hello World");
  });
});
