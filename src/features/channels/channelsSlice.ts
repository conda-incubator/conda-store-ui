import { createSlice } from "@reduxjs/toolkit";
import { environmentDetailsApiSlice } from "../environmentDetails";

export interface IChannelsState {
  channels: string[];
}

const initialState: IChannelsState = { channels: [] };

export const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    updateChannels: (state, action) => {
      const channels = action.payload;
      state.channels = channels;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      environmentDetailsApiSlice.endpoints.getBuild.matchFulfilled,
      (
        state,
        {
          payload: {
            data: {
              specification: { spec }
            }
          }
        }
      ) => {
        // channels can be undefined if a lockfile specification is provided,
        // try getting channels from metadata in that case
        const channels =
          spec?.channels ??
          spec?.lockfile?.metadata?.channels?.map(
            (channel: any) => channel?.url
          ) ??
          [];

        state.channels = channels;
      }
    );
  }
});

export const { updateChannels } = channelsSlice.actions;
