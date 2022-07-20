import React from "react";
import { render } from "@testing-library/react";
import { Dependencies } from "../Dependencies";
import { mockTheme } from "src/utils/helpers/mockTheme";

test.skip("<Dependencies />", () => {
  const { container } = render(
    mockTheme(<Dependencies mode="read-only" dependencies={[]} />)
  );
  console.log(container);
});
