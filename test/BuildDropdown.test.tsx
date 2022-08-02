import React from "react";
import { Build } from "../src/features/metadata/components/BuildDropdown";
import { mockTheme } from "./testutils";
import { buildMapper } from "../src/utils/helpers/buildMapper";
import {
  fireEvent,
  render,
  screen,
  RenderResult
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const build_response = {
  status: "ok",
  data: [
    {
      id: 2,
      environment_id: 2,
      specification: null,
      packages: null,
      status: "COMPLETED",
      size: 315875085,
      scheduled_on: "2022-07-14T12:38:42.932219",
      started_on: "2022-07-14T12:38:44.116409",
      ended_on: "2022-07-14T12:39:48.185573",
      build_artifacts: null
    },
    {
      id: 3,
      environment_id: 2,
      specification: null,
      packages: null,
      status: "COMPLETED",
      size: 315875075,
      scheduled_on: "2022-07-14T12:40:38.095584",
      started_on: "2022-07-14T12:40:38.330526",
      ended_on: "2022-07-14T12:41:33.092302",
      build_artifacts: null
    }
  ],
  message: null,
  page: 1,
  size: 100,
  count: 2
};

const builds = buildMapper(build_response);

describe("<BuildDropdown />", () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  let component: RenderResult;

  beforeEach(() => {
    component = render(mockTheme(<Build builds={builds} />));
  });

  it("should render component", () => {
    expect(component.container).toHaveTextContent(
      "July 14th, 2022 - 12:41 - COMPLETED​"
    );
  });

  it("should display builds in the dropdown", () => {
    const select = screen.getByTestId("test-select");
    fireEvent.change(select, {
      target: { value: "July 14th, 2022 - 12:39 - COMPLETED" }
    });
    expect(component.container).toHaveTextContent(
      "July 14th, 2022 - 12:39 - COMPLETED​"
    );
  });
});
