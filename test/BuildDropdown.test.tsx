import React from "react";
import { Build } from "../src/features/metadata/components/BuildDropdown";
import { mockTheme } from "./testutils";
import {
  fireEvent,
  render,
  screen,
  RenderResult
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const builds = [
  {
    id: 1,
    name: "August 5th, 2022 - 4:04 - Available"
  },
  {
    id: 2,
    name: "August 5th, 2022 - 3:57 - Available"
  }
];

describe("<BuildDropdown />", () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  let component: RenderResult;

  beforeEach(() => {
    component = render(mockTheme(<Build builds={builds} />));
  });

  it("should render component", () => {
    expect(component.container).toHaveTextContent(
      builds[builds.length - 1].name
    );
  });

  it("should display builds in the dropdown", () => {
    const select = screen.getByTestId("test-select");
    fireEvent.change(select, {
      target: { value: builds[0].name }
    });
    expect(component.container).toHaveTextContent(builds[0].name);
  });
});
