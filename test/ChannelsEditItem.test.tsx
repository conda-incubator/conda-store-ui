import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { ChannelsEditItem } from "../src/features/channels/components/ChannelsEditItem";
import { mockTheme } from "./testutils";

describe("<ChannelsEditItem />", () => {
  const mockOnRemove = jest.fn();
  const mockOnEdit = jest.fn();
  const channelName = "conda-store";
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      mockTheme(
        <ChannelsEditItem
          onRemove={mockOnRemove}
          channelName={channelName}
          onEdit={mockOnEdit}
        />
      )
    );
  });

  it("should render component", () => {
    expect(component.container).toHaveTextContent(channelName);
  });

  it("should change the channel name", () => {
    const channel = component.getByText(channelName);
    fireEvent.click(channel);

    const [input] = component.container.getElementsByTagName("input");
    fireEvent.change(input, { target: { value: "new channel name" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(mockOnEdit).toHaveBeenCalled();
  });
});
