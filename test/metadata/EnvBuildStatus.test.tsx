import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { EnvBuildStatus } from "../../src/features/metadata/components";
import { BUILD } from "../testutils";
import { store } from "../../src/store";

describe("<EnvBuildStatus />", () => {
  it("should render link to log for failed build", () => {
    const { getByTestId, getByRole } = render(
      <Provider store={store}>
        <EnvBuildStatus build={{ ...BUILD, status: "FAILED" }} />
      </Provider>
    );
    expect(getByRole("link", { name: "Log" })).toBeInTheDocument();
    expect(getByTestId("build-status")).toHaveTextContent(
      /^Status: Failed\. Log$/
    );
  });

  it("should not render link to log for normal build", () => {
    const { getByTestId, queryByRole } = render(
      <Provider store={store}>
        <EnvBuildStatus build={{ ...BUILD }} />
      </Provider>
    );
    expect(queryByRole("link", { name: "Log" })).not.toBeInTheDocument();
    expect(getByTestId("build-status")).toHaveTextContent(
      /^Status: Completed$/
    );
  });
});
