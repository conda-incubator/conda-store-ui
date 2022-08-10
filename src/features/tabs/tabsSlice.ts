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
    environmentOpened: (
      state,
      action: PayloadAction<{
        environment: Environment;
        selectedEnvironmentId: number | undefined;
      }>
    ) => {
      const environments = state.selectedEnvironments;
      const openedEnvironment = action.payload.environment;

      state.selectedEnvironment = openedEnvironment;
      state.value = openedEnvironment.id;

      if (!environments.some(env => env.id === openedEnvironment.id)) {
        state.selectedEnvironments.push(openedEnvironment);
      }
    },
    environmentClosed: (
      state,
      action: PayloadAction<{ envId: number; selectedEnvironmentId: number }>
    ) => {
      const closedEnvironmentId = action.payload.envId;
      const index = state.selectedEnvironments.findIndex(
        env => env.id === closedEnvironmentId
      );
      const listLength = state.selectedEnvironments.length;

      if (action.payload.selectedEnvironmentId === closedEnvironmentId) {
        if (listLength > 1) {
          const rightItem = state.selectedEnvironments[index + 1];
          const leftItem = state.selectedEnvironments[index - 1];

          state.selectedEnvironment = rightItem ?? leftItem;
          state.value = state.selectedEnvironment.id;
        } else {
          state.selectedEnvironment = null;
          state.value = 0;
        }
      }

      state.selectedEnvironments = state.selectedEnvironments.filter(
        env => env.id !== closedEnvironmentId
      );
    },
    tabChanged: (state, action: PayloadAction<number>) => {
      const tabValue = action.payload;

      const environment = state.selectedEnvironments.find(
        env => env.id === tabValue
      );

      state.value = tabValue;

      if (environment) {
        state.selectedEnvironment = environment;
      }
    }
  }
});

export const { environmentOpened, environmentClosed, tabChanged } =
  tabsSlice.actions;
