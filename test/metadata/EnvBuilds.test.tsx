import React from "react";
import { Provider } from "react-redux";
import { act, render, RenderResult } from "@testing-library/react";
import { EnvBuilds } from "../../src/features/metadata/components";
import { BUILD } from "../testutils";
import { store } from "../../src/store";
import { updateBuilds } from "../../src/features/metadata";

describe("<EnvBuilds />", () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <EnvBuilds currentBuildId={1} selectedBuildId={1} />
      </Provider>
    );
  });

  it("should render component", () => {
    act(() => {
      store.dispatch(updateBuilds([BUILD]));
    });
    expect(component.container).toHaveTextContent("Builds");
  });

  it("should show a progress bar if builds are not available", () => {
    act(() => {
      store.dispatch(updateBuilds([]));
    });
    const progressBar = component.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });
});
