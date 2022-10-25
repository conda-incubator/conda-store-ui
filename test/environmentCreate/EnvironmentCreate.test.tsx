import {
  render,
  RenderResult,
  act,
  waitFor,
  fireEvent
} from "@testing-library/react";
import React from "react";
import { EnvironmentCreate } from "../../src/features/environmentCreate";
import { store } from "../../src/store";
import { Provider } from "react-redux";
import {
  EnvironmentDetailsModes,
  modeChanged
} from "../../src/features/environmentDetails";
import { mockTheme } from "../testutils";

describe("<EnvironmentCreate />", () => {
  window.HTMLElement.prototype.scrollTo = jest.fn();
  const mockEnvironmentNotification = jest.fn();
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      mockTheme(
        <Provider store={store}>
          <EnvironmentCreate
            environmentNotification={mockEnvironmentNotification}
          />
        </Provider>
      )
    );
  });

  it("should toggle the edit view", async () => {
    act(() => {
      store.dispatch(modeChanged(EnvironmentDetailsModes.READ));
    });
    expect(component.getByText("Edit")).toBeInTheDocument();

    act(() => {
      store.dispatch(modeChanged(EnvironmentDetailsModes.CREATE));
    });
    await waitFor(() => {
      expect(component.queryByText("Edit")).not.toBeInTheDocument();
    });
  });

  it("should call createEnvironment method", () => {
    act(() => {
      store.dispatch(modeChanged(EnvironmentDetailsModes.CREATE));
    });
    const createButton = component.getByText("Create");
    fireEvent.click(createButton);
  });
});
