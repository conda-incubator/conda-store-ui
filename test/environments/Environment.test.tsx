import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, RenderResult } from "@testing-library/react";
import { Environment } from "../../src/features/environments";
import { ENVIRONMENT, mockTheme } from "../testutils";

describe("<Environment />", () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      mockTheme(
        <Environment environment={ENVIRONMENT} selectedEnvironmentId={1} />
      ),
      { wrapper: BrowserRouter }
    );
  });

  it("should render with correct text content", () => {
    expect(component.container).toHaveTextContent(ENVIRONMENT.name);
  });
});
