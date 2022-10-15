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
  packageVersions: { [key: string]: string };
  packagesWithLatestVersions: { [key: string]: string };
  installedVersions: { [key: string]: string };
  buildPackagesCache: {
    [key: string]: { packages: BuildPackage[]; count: number };
  };
}

const initialState: IRequestedPackagesState = {
  requestedPackages: [],
  packageVersions: {},
  packagesWithLatestVersions: {},
  buildPackagesCache: {},
  installedVersions: {}
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
        state.installedVersions = {};

        dependencies.forEach(dep => {
          if (typeof dep === "string") {
            const { constraint, name, version } = requestedPackageParser(dep);

            if (version) {
              state.installedVersions[name] = version;
            }

            if (constraint === "latest") {
              state.packagesWithLatestVersions[name] = dep;
            }
          }
        });

        console.log("finished build fetch");
      }
    );
    builder.addMatcher(
      dependenciesApiSlice.endpoints.getBuildPackages.matchFulfilled,
      (state, { payload: { data, size, count, page } }) => {
        state.packageVersions = {};

        data.forEach(dep => {
          const foundPackage = state.packagesWithLatestVersions[dep.name];

          if (foundPackage) {
            state.packageVersions[dep.name] = dep.version;
          }
        });

        console.log("finished deps fetch");
      }
    );
  }
});

export const {
  packageVersionAdded,
  updatePackages,
  dependencyPromoted,
  packageUpdated,
  packageRemoved,
  packageAdded,
  buildPackagesCacheAdded
} = requestedPackagesSlice.actions;
