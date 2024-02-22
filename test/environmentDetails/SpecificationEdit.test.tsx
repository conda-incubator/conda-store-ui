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
    const switchButton = component.getByLabelText("YAML", { exact: false });
    fireEvent.click(switchButton);

    var channels = component.getByText("channels", { exact: true }).closest("div");
    expect(channels?.textContent).toBe("channels: []");

    var dependencies = component.getByText("dependencies", { exact: true }).closest("div");
    expect(dependencies?.textContent).toBe("dependencies:");
    expect(dependencies?.nextElementSibling?.textContent).toBe("  - python>5.0");
    expect(dependencies?.nextElementSibling?.nextElementSibling?.textContent).toBe("  - numpy");

    var variables = component.getByText("variables", { exact: true }).closest("div");
    expect(variables?.textContent).toBe("variables: {}");

    act(() => {
      store.dispatch(updatePackages(["numpy"]));
      store.dispatch(updateChannels(["conda-store1"]));
    });

    await waitFor(() => {
      var channels = component.getByText("channels", { exact: true }).closest("div");
      expect(channels?.textContent).toBe("channels:");
      expect(channels?.nextElementSibling?.textContent).toBe("  - conda-store1");

      var dependencies = component.getByText("dependencies", { exact: true }).closest("div");
      expect(dependencies?.textContent).toBe("dependencies:");
      expect(dependencies?.nextElementSibling?.textContent).toBe("  - numpy");

      var variables = component.getByText("variables", { exact: true }).closest("div");
      expect(variables?.textContent).toBe("variables: {}");
    });

    expect(component.queryByText("YAML", { exact: false })).toBeInTheDocument();
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
    const switchButton = component.getByLabelText("YAML", { exact: false });
    fireEvent.click(switchButton);

    await waitFor(() => {
      var channels = component.getByText("channels", { exact: true }).closest("div");
      expect(channels?.textContent).toBe("channels:");
      expect(channels?.nextElementSibling?.textContent).toBe("  - conda-store1");

      var dependencies = component.getByText("dependencies", { exact: true }).closest("div");
      expect(dependencies?.textContent).toBe("dependencies:");
      expect(dependencies?.nextElementSibling?.textContent).toBe("  - numpy");

      var variables = component.getByText("variables", { exact: true }).closest("div");
      expect(variables?.textContent).toBe("variables: {}");
    });

    const code = stringify({
      channels: ["conda-store2"],
      dependencies: ["python"],
      variables: { CONDA_OVERRIDE_CUDA: "1.2.3" }
    });
    const input = await screen.findByRole<HTMLInputElement>("textbox");
    fireEvent.change(input, {
      target: { textContent: code }
    });

    await waitFor(() => {
      var channels = component.getByText("channels", { exact: true }).closest("div");
      expect(channels?.textContent).toBe("channels:");
      expect(channels?.nextElementSibling?.textContent).toBe("  - conda-store2");

      var dependencies = component.getByText("dependencies", { exact: true }).closest("div");
      expect(dependencies?.textContent).toBe("dependencies:");
      expect(dependencies?.nextElementSibling?.textContent).toBe("  - python");

      var variables = component.getByText("variables", { exact: true }).closest("div");
      expect(variables?.textContent).toBe("variables:");
      expect(variables?.nextElementSibling?.textContent).toBe("  CONDA_OVERRIDE_CUDA: 1.2.3");
    });

    const emptyCode = stringify({
      channels: [],
      dependencies: []
    });

    fireEvent.change(input, {
      target: { textContent: emptyCode }
    });

    await waitFor(() => {
      var channels = component.getByText("channels", { exact: true }).closest("div");
      expect(channels?.textContent).toBe("channels: []");

      var dependencies = component.getByText("dependencies", { exact: true }).closest("div");
      expect(dependencies?.textContent).toBe("dependencies: []");

      // Use queryBy to avoid throwing an error with getBy
      var variables = component.queryByText("variables", { exact: true });
      expect(variables).not.toBeInTheDocument();
    });
  });
});
