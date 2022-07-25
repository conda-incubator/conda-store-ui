import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum EnvironmentDetailsModes {
  "READ" = "read-only",
  "EDIT" = "edit"
}

export interface IEnvironmentDetailsState {
  mode: EnvironmentDetailsModes;
}

const initialState: IEnvironmentDetailsState = {
  mode: EnvironmentDetailsModes.READ
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
  }
});

export const { modeChanged } = environmentDetailsSlice.actions;
