import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEnvironmentCreateState {
  name: string;
  description: string;
  requestedPackages: string[];
  channels: string[];
}

const initialState: IEnvironmentCreateState = {
  name: "",
  description: "",
  channels: [],
  requestedPackages: []
};

export const environmentCreateSlice = createSlice({
  name: "environmentCreate",
  initialState,
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    descriptionChanged: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    }
  }
});

export const { nameChanged, descriptionChanged } =
  environmentCreateSlice.actions;
