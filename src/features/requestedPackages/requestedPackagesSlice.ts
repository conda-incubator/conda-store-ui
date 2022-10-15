import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  BuildPackage,
  CondaSpecificationPip,
  Dependency
} from "../../common/models";
import { requestedPackageParser } from "../../utils/helpers";
import { dependenciesApiSlice } from "../dependencies";
import { environmentDetailsApiSlice } from "../environmentDetails";

export interface IRequestedPackagesState {
  requestedPackages: (string | CondaSpecificationPip)[];
  versionsWithoutConstraints: { [key: string]: string };
  versionsWithConstraints: { [key: string]: string };
  packagesWithLatestVersions: { [key: string]: string };
  buildPackagesCache: {
    [key: string]: { packages: BuildPackage[]; count: number };
  };
}

const initialState: IRequestedPackagesState = {
  requestedPackages: [],
  versionsWithoutConstraints: {},
  versionsWithConstraints: {},
  packagesWithLatestVersions: {},
  buildPackagesCache: {}
};

export const requestedPackagesSlice = createSlice({
  name: "requestedPackages",
  initialState,
  reducers: {
    updatePackages: (state, action) => {
      const packages = action.payload;
      state.requestedPackages = packages;
    },
    dependencyPromoted: (state, action: PayloadAction<Dependency>) => {
      const newRequestedPackage = `${action.payload.name}==${action.payload.version}`;

      state.requestedPackages.push(newRequestedPackage);
    },
    packageUpdated: (
      state,
      action: PayloadAction<{ currentPackage: string; updatedPackage: string }>
    ) => {
      const { currentPackage, updatedPackage } = action.payload;

      state.requestedPackages = state.requestedPackages.map(p =>
        p === currentPackage ? updatedPackage : p
      );
    },
    packageRemoved: (state, action: PayloadAction<string>) => {
      state.requestedPackages = state.requestedPackages.filter(
        p => p !== action.payload
      );
    },
    packageAdded: (state, action: PayloadAction<string>) => {
      state.requestedPackages.push(action.payload);
    },
    buildPackagesCacheAdded: (
      state,
      action: PayloadAction<{
        pkgName: string;
        packages: BuildPackage[];
        count: number;
      }>
    ) => {
      const { pkgName, packages, count } = action.payload;

      state.buildPackagesCache[pkgName] = { packages, count };
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
        state.packagesWithLatestVersions = {};
        state.versionsWithConstraints = {};

        dependencies.forEach(dep => {
          if (typeof dep === "string") {
            const { constraint, name, version } = requestedPackageParser(dep);

            if (version) {
              state.versionsWithConstraints[name] = version;
            }

            if (constraint === "latest") {
              state.packagesWithLatestVersions[name] = dep;
            }
          }
        });
      }
    );
    builder.addMatcher(
      dependenciesApiSlice.endpoints.getBuildPackages.matchFulfilled,
      (state, { payload: { data, size, count, page } }) => {
        state.versionsWithoutConstraints = {};

        data.forEach(dep => {
          const foundPackage = state.packagesWithLatestVersions[dep.name];

          if (foundPackage) {
            state.versionsWithoutConstraints[dep.name] = dep.version;
          }
        });
      }
    );
  }
});

export const {
  updatePackages,
  dependencyPromoted,
  packageUpdated,
  packageRemoved,
  packageAdded,
  buildPackagesCacheAdded
} = requestedPackagesSlice.actions;
