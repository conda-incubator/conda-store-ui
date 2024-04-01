import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { mockTheme } from "../testutils";
import { AddRequestedPackage } from "../../src/features/requestedPackages/components/AddRequestedPackage";
import { store } from "../../src/store";

describe("<AddRequestedPackage />", () => {
  let component: RenderResult;
  const mockOnCancel = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    component = render(
      mockTheme(
        <Provider store={store}>
          <AddRequestedPackage
            onCancel={mockOnCancel}
            onSubmit={mockOnSubmit}
            isCreating={true}
          />
        </Provider>
      )
    );
  });

  it("should call onCancel method", async () => {
    const cancelButton = component.getByTestId("cancelIcon");
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
