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
    expect(container).toHaveTextContent("Switch to YAML Editor");
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
    const switchButton = component.getByLabelText("Switch to Standard View");
    fireEvent.click(switchButton);
    expect(onToggleEditorView).toHaveBeenCalled();
  });
});
