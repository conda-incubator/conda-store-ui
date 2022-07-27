import React from "react";
import { render } from "@testing-library/react";
import { RequestedPackageList } from "../src/features/requestedPackages/components/RequestedPackageList";
import { PACKAGE_LIST, mockTheme } from "./testutils";

describe("<RequestedPackagesEdit />", () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  it("should render component", () => {
    const component = render(
      mockTheme(<RequestedPackageList packageList={PACKAGE_LIST} />)
    );

    expect(component.container).toHaveTextContent("Requested Packages");
  });
});
