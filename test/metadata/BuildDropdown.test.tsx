import React from "react";
import { Provider } from "react-redux";
import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { store } from "../../src/store";
import { BuildDropdown } from "../../src/features/metadata/components/BuildDropdown";
import { mockTheme } from "../testutils";

const builds = [
  {
    id: 0,
    name: "August 5th, 2022 - 4:04 - Available",
    status: "Building"
  },
  {
    id: 1,
    name: "August 5th, 2022 - 3:57 - Available",
    status: "Building"
  }
];

describe("<BuildDropdown />", () => {
  let component: RenderResult;

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
    expect(component.container).toHaveTextContent(builds[0].name);
  });

  it("should display builds in the dropdown", async () => {
    const [dropdownButton] = screen.getAllByRole("button");
    userEvent.click(dropdownButton);
    const dropdownItem = await screen.findByRole("option", {
      name: builds[1].name
    });
    userEvent.click(dropdownItem);

    const buildName = await screen.findByText(builds[1].name);
    expect(buildName).toBeInTheDocument();
  });
});
