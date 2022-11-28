import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import { store } from "../../src/store";
import { ConstraintSelect } from "../../src/components/ConstraintSelect";
import { mockTheme } from "../testutils";

describe("<ConstraintSelect />", () => {
  it("should render component", () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <ConstraintSelect constraint={">"} />
        </Provider>
      )
    );
    expect(component.container).toHaveTextContent(">");
  });

  it("should display builds in the dropdown", () => {
    const handleOnChange = jest.fn();
    const component = render(
      mockTheme(
        <Provider store={store}>
          <ConstraintSelect constraint={">"} onUpdate={handleOnChange} />
        </Provider>
      )
    );
    const select = component.getByTestId("ConstraintSelectTest");
    fireEvent.change(select, {
      target: { value: "<" }
    });

    expect(handleOnChange).toHaveBeenCalled();
  });
});
