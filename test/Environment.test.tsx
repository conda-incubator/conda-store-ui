import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { ENVIRONMENT, mockTheme } from "./testutils";
import { Environment } from "../src/features/environments";

describe("<Environment />", () => {
  const mockOnClick = jest.fn();
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      mockTheme(<Environment environment={ENVIRONMENT} onClick={mockOnClick} />)
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
