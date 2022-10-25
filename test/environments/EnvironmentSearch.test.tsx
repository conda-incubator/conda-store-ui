import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { EnvironmentsSearch } from "../../src/features/environments";

describe("<EnvironmentsSearch />", () => {
  const mockOnChange = jest.fn();
  let component: RenderResult;

  beforeEach(() => {
    component = render(<EnvironmentsSearch onChange={mockOnChange} />);
  });

  it("should render", () => {
    const title = component.getByTestId("env-search-title");
    expect(title).toBeVisible();
    expect(title).toHaveTextContent("Package Manager");
  });

  it("should fire onChange event correctly", () => {
    const input = component.getByPlaceholderText("Search for environment");

    fireEvent.change(input, { target: { value: "new channel" } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
