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
        <EnvBuilds
          currentBuildId={1}
          selectedBuildId={1}
          builds={[BUILD]}
          mode="read-only"
        />
      </Provider>
    );
    expect(component.container).toHaveTextContent("Builds");
  });

  it("should show a progress bar if builds are not available", () => {
    const component = render(
      <Provider store={store}>
        <EnvBuilds
          currentBuildId={1}
          selectedBuildId={1}
          builds={[]}
          mode="read-only"
        />
      </Provider>
    );
    const progressBar = component.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });

  it("should render link to log if selected build failed", () => {
    const failedBuild = { ...BUILD, status: "FAILED" };
    const { getByTestId, getByRole } = render(
      <Provider store={store}>
        <EnvBuilds
          currentBuildId={1}
          selectedBuildId={1}
          builds={[failedBuild]}
          mode="read-only"
        />
      </Provider>
    );
    expect(getByRole("link", { name: "Log" })).toBeInTheDocument();
    expect(getByTestId("build-status")).toHaveTextContent(
      /^Status: Failed\. Log$/
    );
  });

  it("should not render log link for normal build", () => {
    const { getByTestId, queryByRole } = render(
      <Provider store={store}>
        <EnvBuilds
          currentBuildId={1}
          selectedBuildId={1}
          builds={[BUILD]}
          mode="read-only"
        />
      </Provider>
    );
    expect(queryByRole("link", { name: "Log" })).not.toBeInTheDocument();
    expect(getByTestId("build-status")).toHaveTextContent(
      /^Status: Completed$/
    );
  });
});
