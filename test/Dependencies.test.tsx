import { render } from "@testing-library/react";
import React from "react";

import { Dependencies } from "../src/features/dependencies";
import { mockTheme } from "./testutils";

describe("<Dependencies />", () => {
  it("should render when empty", () => {
    const { container } = render(
      mockTheme(<Dependencies mode="read-only" dependencies={[]} />)
    );
    console.log(container);
  });
});
