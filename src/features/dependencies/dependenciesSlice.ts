import { createSlice } from "@reduxjs/toolkit";
import { Dependency } from "src/common/models";

export interface IChannelsState {
  dependencies: Dependency[];
}

const initialState: IChannelsState = { dependencies: [] };

export const dependenciesSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {}
});
