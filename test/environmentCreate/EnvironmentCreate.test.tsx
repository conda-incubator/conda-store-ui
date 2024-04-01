import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {
  render,
  RenderResult,
  act,
  waitFor,
  fireEvent
} from "@testing-library/react";
import { EnvironmentCreate } from "../../src/features/environmentCreate";
import { store } from "../../src/store";
import {
  EnvironmentDetailsModes,
  modeChanged
} from "../../src/features/environmentDetails";
import { mockTheme } from "../testutils";

describe("<EnvironmentCreate />", () => {
  window.HTMLElement.prototype.scrollTo = jest.fn();
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      mockTheme(
        <Provider store={store}>
          <EnvironmentCreate />
        </Provider>
      ),
      { wrapper: BrowserRouter }
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
