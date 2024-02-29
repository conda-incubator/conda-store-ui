import React from "react";
import { Provider } from "react-redux";
import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor
} from "@testing-library/react";
import { SpecificationCreate } from "../../src/features/environmentCreate";
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

    const code = stringify({
      channels: ["conda-channel"],
      dependencies: ["python"]
    });
    const input = await screen.findByRole<HTMLInputElement>("textbox");
    fireEvent.change(input, {
      target: { textContent: code }
    });

    await waitFor(() => {
      expect(
        screen.getByText("conda-channel", { exact: false })
      ).not.toBeNull();
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
