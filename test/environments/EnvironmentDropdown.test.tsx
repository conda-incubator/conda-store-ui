import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { ENVIRONMENT, mockTheme } from "../testutils";
import { EnvironmentDropdown } from "../../src/features/environments";
import { store } from "../../src/store";

describe("<EnvironmentDropdown />", () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      mockTheme(
        <Provider store={store}>
          <EnvironmentDropdown
            data={{
              namespace: "default",
              environments: [ENVIRONMENT]
            }}
          />
        </Provider>
      )
    );
  });

  it("should render with correct namespace", () => {
    expect(component.container).toHaveTextContent("default");
  });

  it("should open a new tab environment", () => {
    const namespaceButton = component.getByTestId("AddIcon");
    fireEvent.click(namespaceButton);
    expect(store.getState().environmentDetails.mode).toBe("create");
  });

  it("should open selected environment", () => {
    const environmentButton = component.getByText(ENVIRONMENT.name);
    fireEvent.click(environmentButton);
    expect(store.getState().tabs.selectedEnvironment?.name).toBe(
      ENVIRONMENT.name
    );
  });
});
