import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { BlockContainerEditMode } from "../../src/components";
import { mockTheme } from "../testutils";

describe("<BlockContainerEditMode />", () => {
  it("should render the component", () => {
    const { container } = render(
      mockTheme(
        <BlockContainerEditMode
          title="Specification"
          onToggleEditMode={() => {}}
          isEditMode={false}
        >
          <></>
        </BlockContainerEditMode>
      )
    );
    expect(container).toHaveTextContent("YAML");
  });

  it("should call onToggleEditMode when the user switches the view", () => {
    const onToggleEditorView = jest.fn();
    const component = render(
      mockTheme(
        <BlockContainerEditMode
          title="Specification"
          onToggleEditMode={onToggleEditorView}
          isEditMode={true}
        >
          <></>
        </BlockContainerEditMode>
      )
    );
    const switchButton = component.getByLabelText("YAML", {
      exact: false
    });
    fireEvent.click(switchButton);
    expect(onToggleEditorView).toHaveBeenCalled();
  });
});
