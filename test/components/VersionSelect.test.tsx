import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import { store } from "../../src/store";
import { VersionSelect } from "../../src/components/VersionSelect";
import { mockTheme } from "../testutils";

jest.mock(
  "../../src/features/requestedPackages/requestedPackageVersionApiSlice",
  () => ({
    useLazyGetPackageVersionSuggestionsQuery: jest.fn(() => [
      () => ({
        data: {
          data: [
            {
              version: "1.0"
            },
            {
              version: "2.0"
            }
          ]
        }
      })
    ])
  })
);

describe("<VersionSelect />", () => {
  it("should render component", async () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <VersionSelect name="numpy" version="1.0" onUpdate={() => ({})} />
        </Provider>
      )
    );
    await component.findAllByText("1.0");
    expect(component.container).toHaveTextContent("1.0");
  });

  it("should change the value", async () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <VersionSelect name="numpy" version="1.0" onUpdate={() => ({})} />
        </Provider>
      )
    );
    await component.findAllByText("1.0");

    const select = component.getByTestId("VersionSelectTest");
    fireEvent.change(select, {
      target: { value: "2.0" }
    });

    expect(component.container).toHaveTextContent("2.0");
  });
});
