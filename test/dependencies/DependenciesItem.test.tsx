import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { DependenciesItem } from "../../src/features/dependencies/components/DependenciesItem";
import { DEPENDENCY, mockTheme } from "../testutils";

describe("<DependenciesItem />", () => {
  const handleClick = jest.fn();
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      mockTheme(
        <DependenciesItem
          mode="edit"
          dependency={DEPENDENCY}
          handleClick={handleClick}
        />
      )
    );
  });

  it("should render component in read-only mode", () => {
    expect(component.container).toHaveTextContent(DEPENDENCY.name);
  });

  it("should render component in edit mode", () => {
    const styledIconButtonElement = component.getByTestId("PromoteIcon");
    fireEvent.click(styledIconButtonElement);
    expect(handleClick).toHaveBeenCalled();
  });
});
