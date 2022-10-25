import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { EnvMetadata } from "../../src/features/metadata/components/EnvMetadata";
import { mockTheme } from "../testutils";

describe("<EnvMetadata />", () => {
  it("should render component in read-only mode", () => {
    const component = render(
      mockTheme(
        <EnvMetadata
          mode="read-only"
          description="test"
          currentBuildId={0}
          onUpdateDescription={() => ({})}
        />
      )
    );

    expect(component.container).toHaveTextContent("Environment Metadata");
  });

  it("should render component in edit mode", () => {
    let description;
    const component = render(
      mockTheme(
        <EnvMetadata
          mode="edit"
          description="test"
          currentBuildId={0}
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
