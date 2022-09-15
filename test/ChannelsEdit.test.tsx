import React from "react";
import {
  fireEvent,
  render,
  screen,
  RenderResult
} from "@testing-library/react";
import { ChannelsEdit } from "../src/features/channels/components/ChannelsEdit";
import { mockTheme, CHANNELS_LIST } from "./testutils";

const channelName = "conda-store";

describe("<ChannelsEdit />", () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      mockTheme(
        <ChannelsEdit
          channelsList={CHANNELS_LIST}
          updateChannels={() => ({})}
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

    expect(screen.getByLabelText("Enter channel")).toHaveValue("test-channel");
    fireEvent.focusOut(input);

    expect(component.container).toHaveTextContent("test-channel");
  });

  it("should remove channel", () => {
    const [deleteIcons] = component.getAllByTestId("DeleteIcon");
    fireEvent.click(deleteIcons);

    expect(component.container).not.toHaveTextContent(channelName);
  });

  it("should edit channel", () => {
    const channel = component.getByText(channelName);
    fireEvent.click(channel);

    const [input] = component.container.getElementsByTagName("input");
    fireEvent.change(input, { target: { value: "new channel name" } });
    fireEvent.focusOut(input);

    expect(component.container).not.toHaveTextContent(channelName);
  });

  it("should click on close icon", () => {
    const addChannelButton = component.getByText("+ Add Channel");
    fireEvent.click(addChannelButton);

    const closeIcon = component.getByTestId("CloseIcon");
    fireEvent.click(closeIcon);

    expect(component.container).not.toHaveTextContent("Enter package");
  });
});
