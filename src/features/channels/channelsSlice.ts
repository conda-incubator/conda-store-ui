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
        let channels = [];

        if (spec.channels) {
          channels = spec.channels;
        } else if (spec.lockfile?.metadata?.channels) {
          channels = spec.lockfile.metadata.channels.map(
            // Note: in the lockfile spec, a channel URL can be a string identifier like "conda-forge"
            (channel: { url: string }) => channel.url
          );
        }

        state.channels = channels;
      }
    );
  }
});

export const { updateChannels } = channelsSlice.actions;
