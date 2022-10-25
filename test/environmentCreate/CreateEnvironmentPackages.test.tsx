import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { CreateEnvironmentPackages } from "../../src/features/environmentCreate";
import { store } from "../../src/store";
import { mockTheme, PACKAGE_LIST } from "../testutils";

describe("<CreateEnvironmentPackages />", () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      mockTheme(
        <Provider store={store}>
          <CreateEnvironmentPackages requestedPackages={PACKAGE_LIST} />
        </Provider>
      )
    );
  });

  it("should render component", () => {
    expect(component.container).toHaveTextContent("Requested Packages");
  });

  it("show add a new package", async () => {
    const addPackageButton = component.getByText("+ Add Package");
    fireEvent.click(addPackageButton);
    expect(component.container).toHaveTextContent("Enter package");
  });
});
