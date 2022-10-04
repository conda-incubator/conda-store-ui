import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dependency, Environment } from "src/common/models";
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
    },
    dependencyPromoted: (state, action: PayloadAction<Dependency>) => {
      state.dependencies = state.dependencies.filter(
        p => p.id !== action.payload.id
      );
    }
  },
  extraReducers: builder => {
    builder.addCase(tabChanged.type, state => {
      state.page = 1;
    });
    builder.addCase(
      environmentOpened.type,
      (
        state,
        {
          payload: { environment, selectedEnvironmentId }
        }: PayloadAction<{
          environment: Environment;
          selectedEnvironmentId: number | undefined;
        }>
      ) => {
        if (
          !selectedEnvironmentId ||
          environment.id !== selectedEnvironmentId
        ) {
          state.page = 1;
        }
      }
    );
    builder.addCase(
      environmentClosed.type,
      (
        state,
        action: PayloadAction<{ envId: number; selectedEnvironmentId: number }>
      ) => {
        if (action.payload.envId === action.payload.selectedEnvironmentId) {
          state.page = 1;
        }
      }
    );
    builder.addMatcher(
      dependenciesApiSlice.endpoints.getBuildPackages.matchFulfilled,
      (state, { payload: { data, size, count, page } }) => {
        if (page === 1) {
          state.dependencies = data;
        } else {
          state.dependencies.push(...data);
        }
        state.size = size;
        state.count = count;
      }
    );
  }
});

export const { pageChanged, dependencyPromoted } = dependenciesSlice.actions;
