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
}

const initialState: IEnvironmentDetailsState = {
  mode: EnvironmentDetailsModes.READ,
  name: "",
  prefix: null,
  installedVersions: {}
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

export const { modeChanged, installedVersionsGenerated } =
  environmentDetailsSlice.actions;
