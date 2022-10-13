import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { environmentDetailsApiSlice } from "./environmentDetailsApiSlice";

export enum EnvironmentDetailsModes {
  "CREATE" = "create",
  "READ" = "read-only",
  "EDIT" = "edit"
}

export interface IEnvironmentDetailsState {
  mode: EnvironmentDetailsModes;
  name: string;
  prefix: string | null | undefined;
  installedVersions: { [key: string]: string };
  updatedConstraints: { [key: string]: { range: string; version: string } };
}

const initialState: IEnvironmentDetailsState = {
  mode: EnvironmentDetailsModes.READ,
  name: "",
  prefix: null,
  installedVersions: {},
  updatedConstraints: {}
};

export const environmentDetailsSlice = createSlice({
  name: "environmentDetails",
  initialState,
  reducers: {
    modeChanged: (
      state,
      action: PayloadAction<IEnvironmentDetailsState["mode"]>
    ) => {
      state.mode = action.payload;
    },
    installedVersionsGenerated: (
      state,
      action: PayloadAction<IEnvironmentDetailsState["installedVersions"]>
    ) => {
      state.installedVersions = action.payload;
    },
    constraintUpdated: (
      state,
      action: PayloadAction<{
        pkgName: string;
        pkgVersion: string;
        pkgConstraint: string;
      }>
    ) => {
      const { pkgName, pkgConstraint, pkgVersion } = action.payload;

      state.updatedConstraints[pkgName] = {
        range: pkgConstraint,
        version: pkgVersion
      };
    },
    constraintsCleared: state => {
      state.updatedConstraints = {};
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
                spec: { name, prefix }
              }
            }
          }
        }
      ) => {
        state.name = name;
        state.prefix = prefix;
      }
    );
  }
});

export const {
  modeChanged,
  installedVersionsGenerated,
  constraintUpdated,
  constraintsCleared
} = environmentDetailsSlice.actions;
