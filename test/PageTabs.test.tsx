import React from "react";
import { act, fireEvent, render, RenderResult } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import {
  environmentOpened,
  openCreateNewEnvironmentTab,
  PageTabs,
  tabsSlice
} from "../src/features/tabs";
import { Provider } from "react-redux";
import { ENVIRONMENTS } from "./testutils";

export const store = configureStore({
  reducer: { tabs: tabsSlice.reducer }
});

describe("<PageTabs />", () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <PageTabs />
      </Provider>
    );
  });

  it("should render component with default tab", () => {
    act(() => {
      store.dispatch(
        environmentOpened({
          environment: ENVIRONMENTS[0],
          selectedEnvironmentId: 1
        })
      );
    });

    expect(component.container).toHaveTextContent("python-flask-env-2");
    const closeIcon = component.getByTestId("closeTab");
    fireEvent.click(closeIcon);

    expect(component.container).not.toHaveTextContent("python-flask-env-2");
  });

  it("should open create environment tab", () => {
    act(() => {
      store.dispatch(openCreateNewEnvironmentTab("default"));
    });
    expect(component.container).toHaveTextContent("Create Environment");

    const closeIcon = component.getByTestId("closeNewTab");
    fireEvent.click(closeIcon);
    expect(component.container).not.toHaveTextContent("Create Environment");
  });

  it("should open multiple environments", () => {
    act(() => {
      store.dispatch(
        environmentOpened({
          environment: ENVIRONMENTS[0],
          selectedEnvironmentId: 1
        })
      );
      store.dispatch(
        environmentOpened({
          environment: ENVIRONMENTS[1],
          selectedEnvironmentId: 2
        })
      );
    });
    const firstTab = component.getByText(ENVIRONMENTS[0].name);
    fireEvent.click(firstTab);

    expect(component.container).toHaveTextContent(
      `${ENVIRONMENTS[0].name}${ENVIRONMENTS[1].name}`
    );
  });
});
