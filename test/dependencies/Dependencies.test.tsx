import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import { mockTheme } from "../testutils";
import { mockDependenciesList } from "../../src/features/dependencies/mocks";
import { store } from "../../src/store";
import { Dependencies } from "../../src/features/dependencies";

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

    expect(container).toHaveTextContent("Packages Installed");
  });

  it("should render component in edit mode", async () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <Dependencies
            mode="edit"
            dependencies={mockDependenciesList}
            hasMore={true}
            next={mockNext}
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
            dependencies={mockDependenciesList}
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
