import React from "react";
import { Provider } from "react-redux";
import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { store } from "../../src/store";
import { BuildDropdown } from "../../src/features/metadata/components/BuildDropdown";
import { mockTheme } from "../testutils";
import { buildDatetimeStatus } from "../../src/utils/helpers/buildMapper";

describe("<BuildDropdown />", () => {
  let component: RenderResult;
  const currentBuildId = 1;

  beforeEach(() => {
    component = render(
      mockTheme(
        <Provider store={store}>
          <BuildDropdown builds={builds} selectedBuildId={0} />
        </Provider>
      )
    );
  });

  it("should render component", () => {
    expect(component.container).toHaveTextContent(
      buildDatetimeStatus(mockBuilds[0], currentBuildId)
    );
  });

  it("should display builds in the dropdown", async () => {
    // This is what the dropdown should display for the build
    const dropdownOptionName = buildDatetimeStatus(
      mockBuilds[1],
      currentBuildId
    );
    const [dropdownButton] = screen.getAllByRole("button");
    userEvent.click(dropdownButton);
    const dropdownItem = await screen.findByRole("option", {
      name: dropdownOptionName
    });
    userEvent.click(dropdownItem);

    const buildName = await screen.findByText(dropdownOptionName);
    expect(buildName).toBeInTheDocument();
  });
});
