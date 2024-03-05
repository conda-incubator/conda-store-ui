import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { EnvBuildStatus } from "../../src/features/metadata/components";
import { BUILD } from "../testutils";
import { store } from "../../src/store";
import { buildMapper } from "../../src/utils/helpers";

describe("<EnvBuildStatus />", () => {
  const [build, failedBuild] = buildMapper(
    [{ ...BUILD }, { ...BUILD, status: "FAILED" }],
    1
  );

  it("should render link to log if selected build failed", () => {
    const { getByTestId, getByRole } = render(
      <Provider store={store}>
        <EnvBuildStatus build={failedBuild} />
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
        <EnvBuildStatus build={build} />
      </Provider>
    );
    expect(queryByRole("link", { name: "Log" })).not.toBeInTheDocument();
    expect(getByTestId("build-status")).toHaveTextContent(
      /^Status: Completed$/
    );
  });
});
