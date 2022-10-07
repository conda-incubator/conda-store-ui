import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CondaSpecificationPip, Dependency } from "../../common/models";
import { requestedPackageParser } from "../../utils/helpers";
import { environmentDetailsApiSlice } from "../environmentDetails";

export interface IRequestedPackagesState {
  requestedPackages: (string | CondaSpecificationPip)[];
  packageVersions: { [key: string]: string };
  packagesWithLatestVersions: { [key: string]: string };
}

const initialState: IRequestedPackagesState = {
  requestedPackages: [],
  packageVersions: {},
  packagesWithLatestVersions: {}
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
    },
    updatePackages: (state, action) => {
      const packages = action.payload;
      state.requestedPackages = packages;
    },
    dependencyPromoted: (state, action: PayloadAction<Dependency>) => {
      const newRequestedPackage = `${action.payload.name}==${action.payload.version}`;

      state.requestedPackages.push(newRequestedPackage);
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

        dependencies.forEach(dep => {
          if (typeof dep === "string") {
            const { constraint, name } = requestedPackageParser(dep);

            if (constraint === "latest") {
              state.packagesWithLatestVersions[name] = dep;
            }
          }
        });
      }
    );
  }
});

export const { packageVersionAdded, updatePackages, dependencyPromoted } =
  requestedPackagesSlice.actions;
