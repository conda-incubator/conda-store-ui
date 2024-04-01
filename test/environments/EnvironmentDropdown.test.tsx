import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import { ENVIRONMENT, mockTheme } from "../testutils";
import { EnvironmentDropdown } from "../../src/features/environments";
import { store } from "../../src/store";

const mountEnvironmentDropdownComponent = (props: any) => {
  return render(
    mockTheme(
      <Provider store={store}>
        <EnvironmentDropdown
          data={{
            ...props,
            namespace: "default",
            environments: [ENVIRONMENT]
          }}
        />
      </Provider>
    ),
    { wrapper: BrowserRouter }
  );
};
describe("<EnvironmentDropdown />", () => {
  it("should not open a new environment", () => {
    const component = mountEnvironmentDropdownComponent({
      canCreate: false,
      canUpdate: false
    });
    const namespaceButton = component.getByTestId("AddIcon");

    expect(window.location.pathname).toBe("/");
    fireEvent.click(namespaceButton);
    expect(window.location.pathname).toBe("/");
  });

  it("should open a new environment", () => {
    const component = mountEnvironmentDropdownComponent({
      canCreate: true,
      canUpdate: true
    });

    expect(component.container).toHaveTextContent("default");

    const namespaceButton = component.getByTestId("AddIcon");

    fireEvent.click(namespaceButton);
    expect(window.location.pathname).toBe("/default/new-environment");
  });

  it("should open selected environment", () => {
    const component = mountEnvironmentDropdownComponent({
      canCreate: true,
      canUpdate: true
    });
    const environmentButton = component.getByText(ENVIRONMENT.name);

    fireEvent.click(environmentButton);
    expect(window.location.pathname).toBe("/default/python-flask-env-2");
  });
});
