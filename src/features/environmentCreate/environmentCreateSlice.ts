import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEnvironmentCreateState {
  name: string;
  description: string;
  requestedPackages: string[];
  channels: string[];
  environmentVariables: Record<string, string>;
}

const initialState: IEnvironmentCreateState = {
  name: "",
  description: "",
  requestedPackages: [],
  channels: [],
  environmentVariables: {}
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
    },
    channelsChanged: (state, action: PayloadAction<string[]>) => {
      state.channels = action.payload;
    },
    environmentVariablesChanged: (
      state,
      action: PayloadAction<Record<string, string>>
    ) => {
      state.environmentVariables = action.payload;
    },
    requestedPackagesChanged: (state, action: PayloadAction<string[]>) => {
      state.requestedPackages = action.payload;
    },
    requestedPackageRemoved: (state, action: PayloadAction<string>) => {
      state.requestedPackages = state.requestedPackages.filter(
        p => p !== action.payload
      );
    },
    requestedPackageUpdated: (
      state,
      action: PayloadAction<{ currentPackage: string; updatedPackage: string }>
    ) => {
      const { currentPackage, updatedPackage } = action.payload;

      state.requestedPackages = state.requestedPackages.map(p =>
        p === currentPackage ? updatedPackage : p
      );
    },
    editorCodeUpdated: (
      state,
      action: PayloadAction<{
        dependencies: string[];
        channels: string[];
        variables: Record<string, string>;
      }>
    ) => {
      state.requestedPackages = action.payload.dependencies;
      state.channels = action.payload.channels;
      state.environmentVariables = action.payload.variables;
    },
    environmentCreateStateCleared: state => {
      state.name = "";
      state.description = "";
      state.channels = [];
      state.requestedPackages = [];
      state.environmentVariables = {};
    }
  }
});

export const {
  nameChanged,
  descriptionChanged,
  channelsChanged,
  environmentVariablesChanged,
  requestedPackagesChanged,
  requestedPackageRemoved,
  requestedPackageUpdated,
  editorCodeUpdated,
  environmentCreateStateCleared
} = environmentCreateSlice.actions;
