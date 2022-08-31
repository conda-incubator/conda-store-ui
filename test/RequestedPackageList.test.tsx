import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { store } from "../src/store";
import { RequestedPackageList } from "../src/features/requestedPackages/components/RequestedPackageList";
import { PACKAGE_LIST, mockTheme } from "./testutils";

describe("<RequestedPackagesEdit />", () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  it("should render component", () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <RequestedPackageList packageList={PACKAGE_LIST} />
        </Provider>
      )
    );

    expect(component.container).toHaveTextContent("Requested Packages");
  });
});
