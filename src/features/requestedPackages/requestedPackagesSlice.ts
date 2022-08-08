import { createSlice } from "@reduxjs/toolkit";
import { CondaSpecificationPip } from "src/common/models";
import { environmentDetailsApiSlice } from "../environmentDetails";

export interface IRequestedPackagesState {
  requestedPackages: (string | CondaSpecificationPip)[];
}

const initialState: IRequestedPackagesState = {
  requestedPackages: []
};

export const requestedPackagesSlice = createSlice({
  name: "requestedPackages",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      environmentDetailsApiSlice.endpoints.getBuild.matchFulfilled,
      (
        state,
        {
          payload: {
            data: {
              specification: {
                spec: { dependencies }
              }
            }
          }
        }
      ) => {
        state.requestedPackages = dependencies;
      }
    );
  }
});
