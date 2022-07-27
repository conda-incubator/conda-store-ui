import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { AddRequestedPackage } from "../src/features/requestedPackages/components/AddRequestedPackage";
import { mockTheme } from "./testutils";

describe("<AddRequestedPackage />", () => {
  it("should call onSubmit method when add a new package", async () => {
    const mockOnCancel = jest.fn();
    const mockOnSubmit = jest.fn();
    const component = render(
      mockTheme(
        <AddRequestedPackage onCancel={mockOnCancel} onSubmit={mockOnSubmit} />
      )
    );

    const input = component.getByLabelText("Enter package");
    fireEvent.change(input, { target: { value: "py" } });

    const pythonOption = component.getByText("python");
    fireEvent.click(pythonOption);
    fireEvent.focusOut(input);

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
