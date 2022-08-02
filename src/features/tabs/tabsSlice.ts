import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Environment } from "src/common/models";

export interface ITabsState {
  selectedEnvironments: Environment[];
  selectedEnvironment: Environment | null;
  value: number;
}

const initialState: ITabsState = {
  selectedEnvironments: [],
  selectedEnvironment: null,
  value: 0
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    environmentOpened: (state, action: PayloadAction<Environment>) => {
      // handle when the same env is opened multiple times
      state.selectedEnvironment = action.payload;
      state.value = action.payload.id;
      state.selectedEnvironments.push(action.payload);
    },
    environmentClosed: (state, action: PayloadAction<number>) => {
      const currentlySelectedEnvironment = state.selectedEnvironment;

      state.selectedEnvironments = state.selectedEnvironments.filter(
        env => env.id !== action.payload
      );

      if (currentlySelectedEnvironment?.id === action.payload) {
        state.selectedEnvironment = state.selectedEnvironments[0];
      }

      state.value = state.selectedEnvironments[0]
        ? state.selectedEnvironments[0].id
        : 0;
    },
    environmentSelected: (state, action: PayloadAction<Environment>) => {
      state.selectedEnvironment = action.payload;
      state.value = action.payload.id;
    },
    valueChanged: (state, action: PayloadAction<number>) => {
      const environment = state.selectedEnvironments.find(
        env => env.id === action.payload
      );

      state.value = action.payload;
      if (environment) {
        state.selectedEnvironment = environment;
      }
    }
  }
});

export const {
  environmentOpened,
  environmentClosed,
  valueChanged,
  environmentSelected
} = tabsSlice.actions;
