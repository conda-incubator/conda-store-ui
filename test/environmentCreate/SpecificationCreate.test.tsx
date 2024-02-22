import React from "react";
import { Provider } from "react-redux";
import {
  act,
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor
} from "@testing-library/react";
import { SpecificationCreate } from "../../src/features/environmentCreate";
import { requestedPackagesChanged } from "../../src/features/environmentCreate";
import { mockTheme } from "../testutils";
import { store } from "../../src/store";
import { stringify } from "yaml";

describe("<SpecificationCreate />", () => {
  let component: RenderResult;
  const mockOnCreateEnvironment = jest.fn();
  beforeEach(() => {
    component = render(
      mockTheme(
        <Provider store={store}>
          <SpecificationCreate onCreateEnvironment={mockOnCreateEnvironment} />
        </Provider>
      )
    );
  });

  it("should render component", () => {
    expect(component.container).toHaveTextContent("Specification");
  });

  it("should switch the view to the yaml editor", () => {
    const switchButton = component.getByLabelText("YAML", { exact: false });
    fireEvent.click(switchButton);

    var channels = component.getByText("channels", { exact: true }).closest("div");
    expect(channels?.textContent).toBe("channels:");

    var dependencies = component.getByText("dependencies", { exact: true }).closest("div");
    expect(dependencies?.textContent).toBe("dependencies:");

    var variables = component.getByText("variables", { exact: true }).closest("div");
    expect(variables?.textContent).toBe("variables: {}");

    act(() => {
      store.dispatch(requestedPackagesChanged(["python>5.0", "numpy"]));
    });

    var channels = component.getByText("channels", { exact: true }).closest("div");
    expect(channels?.textContent).toBe("channels: []");

    var dependencies = component.getByText("dependencies", { exact: true }).closest("div");
    expect(dependencies?.textContent).toBe("dependencies:");
    expect(dependencies?.nextElementSibling?.textContent).toBe("  - python>5.0");
    expect(dependencies?.nextElementSibling?.nextElementSibling?.textContent).toBe("  - numpy");

    var variables = component.getByText("variables", { exact: true }).closest("div");
    expect(variables?.textContent).toBe("variables: {}");

    const vatSelectInput = component.container.querySelector(
      ".cm-editor"
    ) as HTMLInputElement;
    expect(vatSelectInput).toBeInTheDocument();
  });

  it("should call handleSubmit in order to create a new env", () => {
    const createButton = component.getByText("Create");
    fireEvent.click(createButton);

    expect(mockOnCreateEnvironment).toHaveBeenCalled();

    const switchButton = component.getByLabelText("YAML", { exact: false });
    fireEvent.click(switchButton);

    var channels = component.getByText("channels", { exact: true }).closest("div");
    expect(channels?.textContent).toBe("channels:");

    var dependencies = component.getByText("dependencies", { exact: true }).closest("div");
    expect(dependencies?.textContent).toBe("dependencies:");

    var variables = component.getByText("variables", { exact: true }).closest("div");
    expect(variables?.textContent).toBe("variables: {}");

    fireEvent.click(createButton);
    expect(mockOnCreateEnvironment).toHaveBeenCalledWith({
      channels: [],
      dependencies: [],
      variables: {}
    });
  });

  it("should update channels and dependencies", async () => {
    const switchButton = component.getByLabelText("YAML", { exact: false });
    fireEvent.click(switchButton);

    var channels = component.getByText("channels", { exact: true }).closest("div");
    expect(channels?.textContent).toBe("channels:");

    var dependencies = component.getByText("dependencies", { exact: true }).closest("div");
    expect(dependencies?.textContent).toBe("dependencies:");

    var variables = component.getByText("variables", { exact: true }).closest("div");
    expect(variables?.textContent).toBe("variables: {}");

    const code = stringify({
      channels: ["conda-channel"],
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
      expect(channels?.nextElementSibling?.textContent).toBe("  - conda-channel");

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
