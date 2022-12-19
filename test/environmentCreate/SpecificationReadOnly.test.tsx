import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { SpecificationReadOnly } from "../../src/features/environmentCreate/components";
import { store } from "../../src/store";
import { mockTheme } from "../testutils";

describe("<SpecificationReadOnly />", () => {
  it("should render component", () => {
    window.HTMLElement.prototype.scrollTo = jest.fn();
    const component = render(
      mockTheme(
        <Provider store={store}>
          <SpecificationReadOnly />
        </Provider>
      )
    );
    expect(component.container).toHaveTextContent("Specification");
  });
});
