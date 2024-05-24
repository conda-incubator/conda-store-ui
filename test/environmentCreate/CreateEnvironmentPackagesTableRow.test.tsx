import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import { CreateEnvironmentPackagesTableRow } from "../../src/features/environmentCreate";
import * as Hooks from "../../src/hooks";
import { store } from "../../src/store";
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

describe("<CreateEnvironmentPackagesTableRow />", () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  const useDispatchMock = jest.spyOn(Hooks, "useAppDispatch");

  const createComponent = (requestedPackage: string) => {
    return render(
      mockTheme(
        <Provider store={store}>
          <table>
            <tbody>
              <CreateEnvironmentPackagesTableRow
                requestedPackage={requestedPackage}
              />
            </tbody>
          </table>
        </Provider>
      )
    );
  };

  it("should update the constraint", async () => {
    const component = createComponent("numpy>1.0");
    await component.findAllByText("1.0");

    const select = component.getByTestId("ConstraintSelectTest");
    fireEvent.change(select, {
      target: { value: "<" }
    });
    expect(component.container).toHaveTextContent("numpy<");
  });

  it("should update the version", async () => {
    const component = createComponent("numpy>1.0");
    await component.findAllByText("1.0");

    const select = component.getByTestId("VersionSelectTest");
    fireEvent.change(select, {
      target: { value: "2.0" }
    });
    expect(component.container).toHaveTextContent("numpy>​2.0​");
  });

  it("should remove the package", async () => {
    const component = createComponent("numpy");
    const removeButton = component.getByTestId("RemovePackageTest");
    fireEvent.click(removeButton);

    expect(useDispatchMock).toHaveBeenCalled();
  });
});
