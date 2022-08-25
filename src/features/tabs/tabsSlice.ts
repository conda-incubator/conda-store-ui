import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Environment } from "src/common/models";

interface INewEnv {
  isOpen: boolean;
  isActive: boolean;
  namespace: string;
}
export interface ITabsState {
  selectedEnvironments: Environment[];
  selectedEnvironment: Environment | null;
  value: number | string;
  newEnvironment: INewEnv;
}

const initialState: ITabsState = {
  selectedEnvironments: [],
  selectedEnvironment: null,
  value: 0,
  newEnvironment: {
    isOpen: false,
    isActive: false,
    namespace: ""
  }
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
        } else if (listLength === 1 && state.newEnvironment.isOpen) {
          state.value = "create";
          state.selectedEnvironment = null;
          state.newEnvironment.isActive = true;
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
    },
    openCreateNewEnvironmentTab: (state, action) => {
      state.newEnvironment.namespace = action.payload;
      state.value = "create";
      state.selectedEnvironment = null;
      state.newEnvironment.isOpen = true;
      state.newEnvironment.isActive = true;
    },
    closeCreateNewEnvironmentTab: state => {
      const listLength = state.selectedEnvironments.length;
      const lastEnv = state.selectedEnvironments[listLength - 1];

      state.value = lastEnv ? lastEnv.id : 0;
      state.selectedEnvironment = lastEnv ? lastEnv : null;
      state.newEnvironment.isOpen = false;
      state.newEnvironment.isActive = false;
    },
    toggleNewEnvironmentView: (state, action) => {
      if (action.payload) {
        state.value = "create";
        state.selectedEnvironment = null;
      }
      state.newEnvironment.isActive = action.payload;
    }
  }
});

export const {
  environmentOpened,
  environmentClosed,
  tabChanged,
  openCreateNewEnvironmentTab,
  closeCreateNewEnvironmentTab,
  toggleNewEnvironmentView
} = tabsSlice.actions;
