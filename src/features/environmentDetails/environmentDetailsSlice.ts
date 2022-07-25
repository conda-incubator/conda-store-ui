import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEnvironmentDetailsState {
  mode: "read-only" | "edit";
}

const initialState: IEnvironmentDetailsState = {
  mode: "read-only"
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
