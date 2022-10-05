import { createSlice } from "@reduxjs/toolkit";
import { Build } from "../../common/models";
import { environmentsApiSlice } from "./metadataApiSlice";

export interface IBuildState {
  enviroments: Build[];
  page: number;
  count: number;
  size: number;
}

const initialState: IBuildState = {
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
      (state, { payload: { data } }) => {
        state.enviroments.push(...data);
      }
    );
  }
});
