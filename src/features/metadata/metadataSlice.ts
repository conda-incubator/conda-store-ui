import { createSlice } from "@reduxjs/toolkit";
import { Environment } from "src/common/models";
import { environmentsApiSlice } from "./metadataApiSlice";

export interface IEnvironmentState {
  enviroments: Environment[];
  page: number;
  count: number;
  size: number;
}

const initialState: IEnvironmentState = {
  enviroments: [],
  page: 1,
  count: 0,
  size: 0
};

export const enviromentsSlice = createSlice({
  name: "environments",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      environmentsApiSlice.endpoints.getEnviroments.matchFulfilled,
      (state, { payload: { data, page, size, count } }) => {
        state.enviroments.push(...data);
      }
    );
  }
});
