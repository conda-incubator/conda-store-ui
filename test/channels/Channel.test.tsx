import React from "react";
import { render } from "@testing-library/react";
import { Channel } from "../../src/features/channels/components/Channel";

describe("<Channel />", () => {
  it("should render component", () => {
    const { container } = render(<Channel channelName="test" />);

    const box = container.getElementsByClassName("box");
    expect(box).toBeTruthy();
    expect(container).toHaveTextContent("test");
  });
});
