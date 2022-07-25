import { createSlice } from "@reduxjs/toolkit";

export interface IEnvironmentDetailsState {
  mode: "read-only" | "edit";
}

const initialState: IEnvironmentDetailsState = {
  mode: "read-only"
};

export const environmentDetailsSlice = createSlice({
  name: "environmentDetails",
  initialState,
  reducers: {}
});
