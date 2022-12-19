import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { CodeEditor } from "../src/features/yamlEditor";
import { mockTheme } from "./testutils";
import { stringify } from "yaml";

describe("<editor />", () => {
  it("should render the component", async () => {
    const code = stringify({
      channels: ["conda-channel"],
      dependencies: ["python"]
    });

    const onUpdateEditor = jest.fn();
    const component = render(
      mockTheme(<CodeEditor code={""} onChangeEditor={onUpdateEditor} />)
    );

    const input = await screen.findByRole<HTMLInputElement>("textbox");
    act(() => {
      fireEvent.change(input, {
        target: { textContent: `${code}` }
      });

      expect(component.container).toHaveTextContent(
        "91›channels: - conda-channel dependencies: - python"
      );
    });
  });
});
