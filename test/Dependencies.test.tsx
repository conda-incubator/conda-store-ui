import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Dependencies } from "../src/features/dependencies";
import { DEPENDENCIES, mockTheme } from "./testutils";
import { store } from "../src/store";
import { Provider } from "react-redux";

describe("<Dependencies />", () => {
  let mockNext: () => void;

  beforeEach(() => {
    window.HTMLElement.prototype.scrollTo = jest.fn();
    mockNext = jest.fn();
  });

  it("should render the component in read-only mode", () => {
    const { container } = render(
      mockTheme(
        <Provider store={store}>
          <Dependencies hasMore={false} mode="read-only" dependencies={[]} />
        </Provider>
      )
    );

    expect(container).toHaveTextContent("Packages Installed as Dependencies");
  });

  it("should render component in edit mode", async () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <Dependencies
            hasMore={true}
            next={mockNext}
            mode="edit"
            dependencies={DEPENDENCIES}
          />
        </Provider>
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
        <Provider store={store}>
          <Dependencies
            hasMore={false}
            next={mockNext}
            mode="edit"
            dependencies={DEPENDENCIES}
          />
        </Provider>
      )
    );

    const scrollSection = component.container.querySelector("#infScroll");
    if (scrollSection) {
      fireEvent.scroll(scrollSection, { target: { scrollY: 1000 } });
    }

    expect(mockNext).not.toHaveBeenCalled();
  });
});
