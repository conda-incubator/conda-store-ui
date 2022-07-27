import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { AddChannel } from "../src/features/channels/components/AddChannel";
import { mockTheme } from "./testutils";

describe("<AddChannel />", () => {
  it("should call onSubmit method when create a new channel", () => {
    const mockOnCancel = jest.fn();
    const mockOnSubmit = jest.fn();
    const component = render(
      mockTheme(<AddChannel onCancel={mockOnCancel} onSubmit={mockOnSubmit} />)
    );

    const input = component.getByLabelText("Enter channel");
    fireEvent.change(input, { target: { value: "new channel" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
