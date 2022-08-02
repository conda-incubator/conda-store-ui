import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Environment } from "src/common/models";

export interface ITabsState {
  selectedEnvironments: Environment[];
}

const initialState: ITabsState = { selectedEnvironments: [] };

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    environmentOpened: (state, action: PayloadAction<Environment>) => {
      state.selectedEnvironments.push(action.payload);
    },
    environmentClosed: (state, action: PayloadAction<number>) => {
      state.selectedEnvironments = state.selectedEnvironments.filter(
        env => env.id !== action.payload
      );
    }
  }
});

export const { environmentOpened, environmentClosed } = tabsSlice.actions;
