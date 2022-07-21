import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Channel } from "../src/features/channels/components/Channel";

describe("<Channel />", () => {
  it("should render component", () => {
    const { container } = render(<Channel channelName="test" />);

    const box = container.getElementsByClassName("box");
    expect(box).toBeTruthy();

    const typography = container.getElementsByClassName("typography");
    expect(typography).toBeTruthy();

    expect(
      getByTestId(document.documentElement, "SquareIcon")
    ).toBeInTheDocument();

    expect(screen.getByTestId("SquareIcon")).toHaveStyle({
      marginRight: "12px",
      height: "10px",
      width: "10px",
      color: "rgb(25, 118, 210)"
    });
  });
});
