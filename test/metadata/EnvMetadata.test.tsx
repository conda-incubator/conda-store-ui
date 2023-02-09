import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import { store } from "../../src/store";
import { EnvMetadata } from "../../src/features/metadata/components/EnvMetadata";
import { mockTheme } from "../testutils";

describe("<EnvMetadata />", () => {
  it("should render component in read-only mode", () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <EnvMetadata
            mode="read-only"
            description="test"
            currentBuildId={0}
            onUpdateDescription={() => ({})}
            onUpdateBuildId={() => {}}
          />
        </Provider>
      )
    );

    expect(component.container).toHaveTextContent("Environment Metadata");
  });

  it("should render component in edit mode", () => {
    let description;
    const component = render(
      mockTheme(
        <Provider store={store}>
          <EnvMetadata
            mode="edit"
            description="test"
            currentBuildId={0}
            onUpdateDescription={e => (description = e)}
            onUpdateBuildId={() => {}}
          />
        </Provider>
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
