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
  // Was this environment built from a lockfile?
  isFromLockfile: boolean | null;
}

const initialState: IEnvironmentDetailsState = {
  mode: EnvironmentDetailsModes.READ,
  name: "",
  prefix: null,
  isFromLockfile: null
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
                spec: { name, prefix, lockfile }
              }
            }
          }
        }
      ) => {
        state.name = name;
        state.prefix = prefix;
        state.isFromLockfile = Boolean(lockfile);
      }
    );
  }
});

export const { modeChanged } = environmentDetailsSlice.actions;
