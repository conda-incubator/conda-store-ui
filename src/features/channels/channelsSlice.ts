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
    addChannel: (state, action) => {
      const newChannel = action.payload;
      state.channels.push(newChannel);
    },
    deleteChannel: (state, action) => {
      const channelToRemove = action.payload;
      state.channels = state.channels.filter(
        channel => channel !== channelToRemove
      );
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
              specification: {
                spec: { channels }
              }
            }
          }
        }
      ) => {
        state.channels = channels;
      }
    );
  }
});

export const { addChannel, deleteChannel } = channelsSlice.actions;
