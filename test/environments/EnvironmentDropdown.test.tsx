import React from "react";
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
    )
  );
};
describe("<EnvironmentDropdown />", () => {
  it("should not open a new tab environment", () => {
    const component = mountEnvironmentDropdownComponent({
      canCreate: false,
      canUpdate: false
    });
    const namespaceButton = component.getByTestId("AddIcon");
    fireEvent.click(namespaceButton);
    expect(store.getState().environmentDetails.mode).toBe("read-only");
  });

  it("should open a new tab environment", () => {
    const component = mountEnvironmentDropdownComponent({
      canCreate: true,
      canUpdate: true
    });

    expect(component.container).toHaveTextContent("default");

    const namespaceButton = component.getByTestId("AddIcon");
    fireEvent.click(namespaceButton);
    expect(store.getState().environmentDetails.mode).toBe("create");
  });

  it("should open selected environment", () => {
    const component = mountEnvironmentDropdownComponent({
      canCreate: true,
      canUpdate: true
    });
    const environmentButton = component.getByText(ENVIRONMENT.name);
    fireEvent.click(environmentButton);
    expect(store.getState().tabs.selectedEnvironment?.name).toBe(
      ENVIRONMENT.name
    );
  });
});
