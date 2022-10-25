import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { ChannelsEdit } from "../../src/features/channels/components/ChannelsEdit";
import { mockTheme, CHANNELS_LIST } from "../testutils";

const channelName = "conda-store";

describe("<ChannelsEdit />", () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  const spyUpdateChannels = jest.fn();
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      mockTheme(
        <ChannelsEdit
          channelsList={CHANNELS_LIST}
          updateChannels={spyUpdateChannels}
        />
      )
    );
  });

  it("should render component", () => {
    expect(component.container).toHaveTextContent("Channels");
  });

  it("should add new channel", () => {
    const addChannelButton = component.getByText("+ Add Channel");
    fireEvent.click(addChannelButton);

    expect(component.container).toHaveTextContent("Enter channel");

    const input = component.getByLabelText("Enter channel");
    fireEvent.change(input, { target: { value: "test-channel" } });
    fireEvent.focusOut(input);

    expect(spyUpdateChannels).toHaveBeenCalledWith([
      "conda-store",
      "default",
      "test-channel"
    ]);
  });

  it("should remove channel", () => {
    const [deleteIcon] = component.getAllByTestId("DeleteIcon");
    fireEvent.click(deleteIcon);

    expect(spyUpdateChannels).toHaveBeenCalledWith(["default"]);
  });

  it("should edit channel", () => {
    const channel = component.getByText(channelName);
    fireEvent.click(channel);

    const [input] = component.container.getElementsByTagName("input");
    fireEvent.change(input, { target: { value: "new channel name" } });
    fireEvent.focusOut(input);

    expect(spyUpdateChannels).toHaveBeenCalledWith([
      "new channel name",
      "default"
    ]);
  });

  it("should click on close icon", () => {
    const addChannelButton = component.getByText("+ Add Channel");
    fireEvent.click(addChannelButton);

    const closeIcon = component.getByTestId("CloseIcon");
    fireEvent.click(closeIcon);

    expect(component.container).not.toHaveTextContent("Enter package");
  });
});
