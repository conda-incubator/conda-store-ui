import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { Environment } from "../../src/features/environments";
import { ENVIRONMENT, mockTheme } from "../testutils";

describe("<Environment />", () => {
  const mockOnClick = jest.fn();
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      mockTheme(
        <Environment
          environment={ENVIRONMENT}
          onClick={mockOnClick}
          selectedEnvironmentId={1}
        />
      )
    );
  });

  it("should render with correct text content", () => {
    expect(component.container).toHaveTextContent(ENVIRONMENT.name);
  });

  it("should fire onClick event correctly", () => {
    const btn = component.getByText(ENVIRONMENT.name);
    fireEvent.click(btn);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
