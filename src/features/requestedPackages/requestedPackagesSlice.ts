import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CondaSpecificationPip } from "src/common/models";
import { environmentDetailsApiSlice } from "../environmentDetails";

export interface IRequestedPackagesState {
  requestedPackages: (string | CondaSpecificationPip)[];
  packageVersions: { [key: string]: string };
}

const initialState: IRequestedPackagesState = {
  requestedPackages: [],
  packageVersions: {}
};

export const requestedPackagesSlice = createSlice({
  name: "requestedPackages",
  initialState,
  reducers: {
    packageVersionAdded: (
      state,
      action: PayloadAction<{ packageName: string; version: string }>
    ) => {
      const { packageName, version } = action.payload;

      state.packageVersions[packageName] = version;
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

export const { packageVersionAdded } = requestedPackagesSlice.actions;
