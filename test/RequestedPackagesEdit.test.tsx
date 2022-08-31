import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { store } from "../src/store";
import { RequestedPackagesEdit } from "../src/features/requestedPackages/components/RequestedPackagesEdit";
import { PACKAGE_LIST, mockTheme } from "./testutils";

describe("<RequestedPackagesEdit />", () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      mockTheme(
        <Provider store={store}>
          <RequestedPackagesEdit
            packageList={PACKAGE_LIST}
            updatePackages={() => ({})}
          />
        </Provider>
      )
    );
  });

  it("should render component", () => {
    expect(component.container).toHaveTextContent("Requested Packages");
  });

  it("should add new package", () => {
    const addPackageButton = component.getByText("+ Add Package");
    fireEvent.click(addPackageButton);

    expect(component.container).toHaveTextContent("Enter package");

    const input = component.getByLabelText("Enter package");
    fireEvent.change(input, { target: { value: "Testing package" } });
    fireEvent.focusOut(input);
  });

  it("should remove package", () => {
    const [deleteIcons] = component.getAllByTestId("DeleteIcon");
    fireEvent.click(deleteIcons);

    expect(component.container).not.toHaveTextContent("numpy");
  });

  it("should remove a package before adding it", () => {
    const addPackageButton = component.getByText("+ Add Package");
    fireEvent.click(addPackageButton);

    const deleteIcons = component.getAllByTestId("DeleteIcon");
    fireEvent.click(deleteIcons[deleteIcons.length - 1]);

    expect(component.container).not.toHaveTextContent("Enter package");
  });
});
