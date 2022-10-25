import React from "react";
import { Provider } from "react-redux";
import { act, render, waitFor } from "@testing-library/react";
import { SpecificationReadOnly } from "../../src/features/environmentDetails";
import { store } from "../../src/store";
import { updateDependencies } from "../../src/features/dependencies";
import { mockTheme } from "../testutils";

describe("<SpecificationReadOnly />", () => {
  it("should render component", async () => {
    window.HTMLElement.prototype.scrollTo = jest.fn();
    const component = render(
      mockTheme(
        <Provider store={store}>
          <SpecificationReadOnly />
        </Provider>
      )
    );

    act(() => {
      store.dispatch(
        updateDependencies([
          {
            id: 0,
            name: "apykernel"
          }
        ])
      );
    });

    expect(component.container).toHaveTextContent("Specification");
    await waitFor(() => {
      expect(component.queryByText("apykernel")).toBeInTheDocument();
    });
  });
});
