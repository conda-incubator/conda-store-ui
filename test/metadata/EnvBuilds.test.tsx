import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { EnvBuilds } from "../../src/features/metadata/components";
import { BUILD } from "../testutils";
import { store } from "../../src/store";

describe("<EnvBuilds />", () => {
  it("should render component", () => {
    const component = render(
      <Provider store={store}>
        <EnvBuilds selectedBuildId={1} builds={[BUILD]} />
      </Provider>
    );
    expect(component.container).toHaveTextContent("Builds");
  });

  it("should show a progress bar if builds are not available", () => {
    const component = render(
      <Provider store={store}>
        <EnvBuilds selectedBuildId={1} builds={[]} />
      </Provider>
    );
    const progressBar = component.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });
});
