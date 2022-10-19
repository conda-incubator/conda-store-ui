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
    },
    channelsChanged: (state, action: PayloadAction<string[]>) => {
      state.channels = action.payload;
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
      action: PayloadAction<{ dependencies: string[]; channels: string[] }>
    ) => {
      state.requestedPackages = action.payload.dependencies;
      state.channels = action.payload.channels;
    },
    environmentCreateStateCleared: state => {
      state.name = "";
      state.description = "";
      state.channels = [];
      state.requestedPackages = [];
    }
  }
});

export const {
  nameChanged,
  descriptionChanged,
  channelsChanged,
  requestedPackagesChanged,
  requestedPackageRemoved,
  requestedPackageUpdated,
  editorCodeUpdated,
  environmentCreateStateCleared
} = environmentCreateSlice.actions;
