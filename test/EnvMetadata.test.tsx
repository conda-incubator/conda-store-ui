import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { EnvMetadata } from "../src/features/metadata/components/EnvMetadata";
import { buildMapper } from "../src/utils/helpers/buildMapper";
import { mockTheme } from "./testutils";

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

describe("<EnvMetadata />", () => {
  it("should render component", () => {
    const component = render(mockTheme(<EnvMetadata builds={builds} />));

    expect(component.container).toHaveTextContent("Environment Metadata");

    expect(component.container).toHaveTextContent("Description");

    expect(component.container).toHaveTextContent("Build");

    expect(component.container).toHaveTextContent(
      "Status: Completed/Building/Failed"
    );
  });
});
