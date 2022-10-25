import React from "react";
import { Provider } from "react-redux";
import { act, fireEvent, render } from "@testing-library/react";
import { SpecificationEdit } from "../../src/features/environmentDetails";
import { store } from "../../src/store";
import { updatePackages } from "../../src/features/requestedPackages";
import { updateChannels } from "../../src/features/channels";

describe("<SpecificationEdit />", () => {
  window.HTMLElement.prototype.scrollTo = jest.fn();

  it("should show the available packages", () => {
    const component = render(
      <Provider store={store}>
        <SpecificationEdit
          descriptionUpdated={false}
          onUpdateEnvironment={jest.fn()}
        />
      </Provider>
    );

    act(() => {
      store.dispatch(updatePackages(["python>5.0", "numpy"]));
    });
    expect(component.queryByText("numpy")).toBeInTheDocument();
  });

  it("should toggle to yaml editor", async () => {
    const component = render(
      <Provider store={store}>
        <SpecificationEdit
          descriptionUpdated={false}
          onUpdateEnvironment={jest.fn()}
        />
      </Provider>
    );
    const switchButton = component.getByLabelText("Switch to YAML Editor");
    fireEvent.click(switchButton);

    act(() => {
      store.dispatch(updatePackages(["numpy"]));
      store.dispatch(updateChannels(["conda-store"]));
    });

    expect(
      component.queryByText("Switch to Standard View")
    ).toBeInTheDocument();
  });

  it("should cancel environment edition", () => {
    const component = render(
      <Provider store={store}>
        <SpecificationEdit
          descriptionUpdated={false}
          onUpdateEnvironment={jest.fn()}
        />
      </Provider>
    );
    const cancelButton = component.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(store.getState().environmentDetails.mode).toBe("read-only");
  });
});
