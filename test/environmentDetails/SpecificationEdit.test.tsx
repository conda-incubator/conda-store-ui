import React from "react";
import { Provider } from "react-redux";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { mockTheme } from "../testutils";
import { SpecificationEdit } from "../../src/features/environmentDetails";
import { store } from "../../src/store";
import { updatePackages } from "../../src/features/requestedPackages";
import { updateChannels } from "../../src/features/channels";
import { stringify } from "yaml";

jest.mock("lodash", () => {
  const module = jest.requireActual("lodash");
  module.debounce = jest.fn(fn => fn);
  return module;
});

describe("<SpecificationEdit />", () => {
  window.HTMLElement.prototype.scrollTo = jest.fn();

  it("should show the available packages", () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <SpecificationEdit
            descriptionUpdated={false}
            onUpdateEnvironment={jest.fn()}
          />
        </Provider>
      )
    );

    act(() => {
      store.dispatch(updatePackages(["python>5.0", "numpy"]));
    });
    expect(component.queryByText("numpy")).toBeInTheDocument();
  });

  it("should toggle to yaml editor", async () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <SpecificationEdit
            descriptionUpdated={false}
            onUpdateEnvironment={jest.fn()}
          />
        </Provider>
      )
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
      mockTheme(
        <Provider store={store}>
          <SpecificationEdit
            descriptionUpdated={false}
            onUpdateEnvironment={jest.fn()}
          />
        </Provider>
      )
    );
    const cancelButton = component.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(store.getState().environmentDetails.mode).toBe("read-only");
  });

  it("should update channels and dependencies", async () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <SpecificationEdit
            descriptionUpdated={false}
            onUpdateEnvironment={jest.fn()}
          />
        </Provider>
      )
    );
    const switchButton = component.getByLabelText("Switch to YAML Editor");
    fireEvent.click(switchButton);

    const code = stringify({
      channels: ["conda-channel"],
      dependencies: ["python"]
    });
    const input = await screen.findByRole<HTMLInputElement>("textbox");
    fireEvent.change(input, {
      target: { textContent: code }
    });

    await waitFor(() => {
      expect(screen.getByText("conda-channel")).not.toBeNull();
    });

    const emptyCode = stringify({
      channels: [],
      dependencies: []
    });

    fireEvent.change(input, {
      target: { textContent: emptyCode }
    });

    await waitFor(() => {
      expect(screen.getByText("dependencies")).not.toBeNull();
    });
  });
});
