import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { EnvMetadata } from "../src/features/metadata/components/EnvMetadata";
import { mockTheme } from "./testutils";

const build_response = {
  data: {
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
  }
};

jest.mock("../src/features/metadata", () => ({
  useGetEnviromentsQuery: jest.fn(() => build_response),
  useUpdateEnvironmentMutation: jest.fn(() => [
    {
      updateEnvironment: jest.fn
    }
  ])
}));

jest.mock("../src/hooks", () => ({
  useAppSelector: jest.fn(() => ({}))
}));

describe("<EnvMetadata />", () => {
  it("should render component in read-only mode", () => {
    const component = render(
      mockTheme(
        <EnvMetadata
          mode="read-only"
          envDescription="test"
          onUpdateDescription={() => ({})}
        />
      )
    );

    expect(component.container).toHaveTextContent("Environment Metadata");
    expect(component.container).toHaveTextContent("Build");
  });

  it("should render component in edit mode", () => {
    let description;
    const component = render(
      mockTheme(
        <EnvMetadata
          mode="edit"
          envDescription="test"
          onUpdateDescription={e => (description = e)}
        />
      )
    );
    const newDescription = "Awesome new description";

    const textarea = component.getByPlaceholderText(
      "Enter here the description of your environment"
    );
    fireEvent.change(textarea, { target: { value: newDescription } });

    expect(textarea).toBeInTheDocument();
    expect(description).toBe(newDescription);
  });
});
