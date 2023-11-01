import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { EnvironmentsSearch } from "../../src/features/environments";
import { mockTheme } from "../testutils";
import { store } from "../../src/store";

describe("<EnvironmentsSearch />", () => {
  const mockOnChange = jest.fn();
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      mockTheme(
        <Provider store={store}>
          <EnvironmentsSearch onChange={mockOnChange} />
        </Provider>
      )
    );
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
