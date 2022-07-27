import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Dependencies } from "../src/features/dependencies";
import { DEPENDENCIES, mockTheme } from "./testutils";

describe("<Dependencies />", () => {
  it("should render the component in read-only mode", () => {
    const { container } = render(
      mockTheme(<Dependencies mode="read-only" dependencies={[]} />)
    );

    expect(container).toHaveTextContent("Packages Installed as Dependencies");
  });

  it("should render component in edit mode", async () => {
    const component = render(
      mockTheme(<Dependencies mode="edit" dependencies={DEPENDENCIES} />)
    );

    const scrollSection = component.container.querySelector("#infScroll");
    fireEvent.scroll(scrollSection, { target: { scrollY: 1000 } });

    await waitFor(
      () => expect(component.container).toHaveTextContent("backcall"),
      {
        timeout: 2000
      }
    );
  });

  it("should render component in edit mode", async () => {
    const component = render(
      mockTheme(<Dependencies mode="edit" dependencies={DEPENDENCIES} />)
    );

    const [promoteIcons] = component.getAllByTestId("FileUploadIcon");
    fireEvent.click(promoteIcons);

    expect(component.container).not.toHaveTextContent(DEPENDENCIES[0].name);
  });
});
