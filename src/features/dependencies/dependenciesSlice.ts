import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dependency } from "src/common/models";
import { dependenciesApiSlice } from "./dependenciesApiSlice";

export interface IChannelsState {
  dependencies: Dependency[];
  page: number;
  count: number;
  size: number;
}

const initialState: IChannelsState = {
  dependencies: [],
  page: 1,
  count: 0,
  size: 0
};

export const dependenciesSlice = createSlice({
  name: "dependencies",
  initialState,
  reducers: {
    pageChanged: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    environmentChanged: state => {
      state.dependencies = [];
      state.page = 1;
      state.count = 0;
      state.size = 0;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      dependenciesApiSlice.endpoints.getBuildPackages.matchFulfilled,
      (state, { payload: { data, page, size, count } }) => {
        state.dependencies.push(...data);
        state.page = page;
        state.size = size;
        state.count = count;
      }
    );
  }
});

export const { pageChanged, environmentChanged } = dependenciesSlice.actions;
