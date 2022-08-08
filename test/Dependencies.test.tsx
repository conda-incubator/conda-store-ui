import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Dependencies } from "../src/features/dependencies";
import { DEPENDENCIES, mockTheme } from "./testutils";

describe("<Dependencies />", () => {
  let mockNext: () => void;

  beforeEach(() => {
    mockNext = jest.fn();
  });

  it("should render the component in read-only mode", () => {
    const { container } = render(
      mockTheme(
        <Dependencies hasMore={false} mode="read-only" dependencies={[]} />
      )
    );

    expect(container).toHaveTextContent("Packages Installed as Dependencies");
  });

  it("should render component in edit mode", async () => {
    const component = render(
      mockTheme(
        <Dependencies
          hasMore={true}
          next={mockNext}
          mode="edit"
          dependencies={DEPENDENCIES}
        />
      )
    );

    const scrollSection = component.container.querySelector("#infScroll");
    if (scrollSection) {
      fireEvent.scroll(scrollSection, { target: { scrollY: 1000 } });
    }

    expect(mockNext).toHaveBeenCalled();
  });

  it("should not call next function when hasMore is false", () => {
    const component = render(
      mockTheme(
        <Dependencies
          hasMore={false}
          next={mockNext}
          mode="edit"
          dependencies={DEPENDENCIES}
        />
      )
    );

    const scrollSection = component.container.querySelector("#infScroll");
    if (scrollSection) {
      fireEvent.scroll(scrollSection, { target: { scrollY: 1000 } });
    }

    expect(mockNext).not.toHaveBeenCalled();
  });
});
