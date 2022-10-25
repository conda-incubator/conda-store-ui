import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Popup } from "../../src/components";
import { mockTheme } from "../testutils";

describe("<Popup />", () => {
  it("should render and close the component", () => {
    const handleOnClose = jest.fn();
    const component = render(
      mockTheme(
        <Popup
          isVisible={true}
          description="Popup description"
          onClose={handleOnClose}
        />
      )
    );
    expect(component.container).toHaveTextContent("Popup description");

    const closeButton = component.getByTitle("Close");
    fireEvent.click(closeButton);

    expect(handleOnClose).toHaveBeenCalled();
  });
});
