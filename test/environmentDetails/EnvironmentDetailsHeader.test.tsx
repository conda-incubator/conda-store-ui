import React from "react";
import { Provider } from "react-redux";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import {
  EnvironmentDetailsHeader,
  EnvironmentDetailsModes,
  modeChanged
} from "../../src/features/environmentDetails";
import { store } from "../../src/store";
import { mockTheme } from "../testutils";

describe("<EnvironmentDetailsHeader />", () => {
  it("should render component in read mode", () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <EnvironmentDetailsHeader
            envName="Environment name"
            onUpdateName={jest.fn()}
            showEditButton={true}
          />
        </Provider>
      )
    );

    act(() => {
      store.dispatch(modeChanged(EnvironmentDetailsModes.READ));
    });
    expect(component.container).toHaveTextContent("Environment name");

    const editButton = component.getByText("Edit");
    fireEvent.click(editButton);
    expect(store.getState().environmentDetails.mode).toEqual("edit");
  });

  it("should render component in edit mode", async () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <EnvironmentDetailsHeader
            envName="Environment name"
            onUpdateName={jest.fn()}
            showEditButton={true}
          />
        </Provider>
      )
    );
    act(() => {
      store.dispatch(modeChanged(EnvironmentDetailsModes.EDIT));
    });
    await waitFor(() => {
      expect(component.queryByText("Edit")).not.toBeInTheDocument();
    });
  });

  it("should render component in create mode without namespace", () => {
    const mockOnUpdateName = jest.fn();
    const component = render(
      mockTheme(
        <Provider store={store}>
          <EnvironmentDetailsHeader
            envName={undefined}
            onUpdateName={mockOnUpdateName}
            showEditButton={true}
          />
        </Provider>
      )
    );
    act(() => {
      store.dispatch(modeChanged(EnvironmentDetailsModes.CREATE));
    });

    const input = component.getByLabelText("Environment name");
    const newEnvName = "My new environment name";
    fireEvent.change(input, { target: { value: newEnvName } });
    expect(mockOnUpdateName).toHaveBeenCalledWith(newEnvName);
    expect(component.queryByText("Namespace")).not.toBeInTheDocument();
  });

  it("should render component in create mode with namespace", () => {
    const mockOnUpdateName = jest.fn();
    const component = render(
      mockTheme(
        <Provider store={store}>
          <EnvironmentDetailsHeader
            envName={undefined}
            namespace="test-namespace"
            onUpdateName={mockOnUpdateName}
            showEditButton={true}
          />
        </Provider>
      )
    );
    act(() => {
      store.dispatch(modeChanged(EnvironmentDetailsModes.CREATE));
    });
    expect(component.getByLabelText("Namespace")).toBeInTheDocument();
  });
});
