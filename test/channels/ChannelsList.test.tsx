import React from "react";
import { render, screen } from "@testing-library/react";
import { ChannelsList } from "../../src/features/channels/components/ChannelsList";
import { mockTheme } from "../testutils";

const channelsList = ["conda-store", "default"];

describe("<ChannelsList />", () => {
  it("should render component", () => {
    render(mockTheme(<ChannelsList channelList={channelsList} />));

    expect(channelsList.length).toBe(2);
    expect(screen.getByText("Channels")).toBeInTheDocument();
    expect(screen.getByText(`${channelsList[0]}`)).toBeInTheDocument();
  });
});
