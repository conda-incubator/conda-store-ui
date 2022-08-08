import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dependency } from "src/common/models";
import { environmentClosed, environmentOpened, tabChanged } from "../tabs";
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
    }
  },
  extraReducers: builder => {
    builder.addCase(tabChanged.type, (state, action) => {
      state.dependencies = [];
      state.page = 1;
      state.count = 0;
      state.size = 0;
    });
    builder.addCase(environmentOpened.type, (state, action) => {
      state.dependencies = [];
      state.page = 1;
      state.count = 0;
      state.size = 0;
    });
    builder.addCase(environmentClosed.type, (state, action) => {
      state.dependencies = [];
      state.page = 1;
      state.count = 0;
      state.size = 0;
    });
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

export const { pageChanged } = dependenciesSlice.actions;
