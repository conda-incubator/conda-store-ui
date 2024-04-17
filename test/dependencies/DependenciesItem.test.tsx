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
        <table>
          <tbody>
            <tr>
              <DependenciesItem
                mode="edit"
                dependency={DEPENDENCY}
                handleClick={handleClick}
                isLast={false}
              />
            </tr>
          </tbody>
        </table>
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
