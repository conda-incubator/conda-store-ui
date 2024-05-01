import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CondaSpecificationPip } from "../../common/models/CondaSpecificationPip";

interface INewEnvironmentForm {
  name: string;
  description: string;
  requestedPackages: Array<string | CondaSpecificationPip>;
  channels: string[];
  environmentVariables: Record<string, string>;
  showCodeEditor: boolean;
  codeEditorContent: string;
}
export interface IEnvironmentCreateState {
  [key: string]: INewEnvironmentForm;
}

const getNewEnvironmentForm = (): INewEnvironmentForm => ({
  name: "",
  description: "",
  requestedPackages: [],
  channels: [],
  environmentVariables: {},
  showCodeEditor: false,
  codeEditorContent: ""
});

const initialState: IEnvironmentCreateState = {
  "": getNewEnvironmentForm()
};

export const environmentCreateSlice = createSlice({
  name: "environmentCreate",
  initialState,
  reducers: {
    nameChanged: (state, action: PayloadAction<[string, string]>) => {
      const [key, name] = action.payload;
      return {
        ...state,
        [key]: {
          ...state[key],
          name
        }
      };
    },
    descriptionChanged: (state, action: PayloadAction<[string, string]>) => {
      const [key, description] = action.payload;
      return {
        ...state,
        [key]: {
          ...state[key],
          description
        }
      };
    },
    channelsChanged: (state, action: PayloadAction<[string, string[]]>) => {
      const [key, channels] = action.payload;
      return {
        ...state,
        [key]: {
          ...state[key],
          channels
        }
      };
    },
    requestedPackagesChanged: (
      state,
      action: PayloadAction<[string, Array<string | CondaSpecificationPip>]>
    ) => {
      const [key, requestedPackages] = action.payload;
      return {
        ...state,
        [key]: {
          ...state[key],
          requestedPackages
        }
      };
    },
    requestedPackageAdded: (state, action: PayloadAction<[string, string]>) => {
      const [key, packageName] = action.payload;
      const requestedPackages = [...state[key].requestedPackages];
      if (requestedPackages.indexOf(packageName) === -1) {
        requestedPackages.push(packageName);
      }
      return {
        ...state,
        [key]: {
          ...state[key],
          requestedPackages
        }
      };
    },
    requestedPackageRemoved: (
      state,
      action: PayloadAction<[string, string]>
    ) => {
      const [key, packageName] = action.payload;
      const requestedPackages = state[key].requestedPackages.filter(
        (p: string) => p !== packageName
      );

      console.log(
        `action requestedPackageRemoved ${packageName}, requestedPackages after filter`,
        requestedPackages
      );

      return {
        ...state,
        [key]: {
          ...state[key],
          requestedPackages
        }
      };
    },
    requestedPackageUpdated: (
      state,
      action: PayloadAction<
        [string, { currentPackage: string; updatedPackage: string }]
      >
    ) => {
      const [key, { currentPackage, updatedPackage }] = action.payload;
      const requestedPackages = state[key].requestedPackages.map((p: string) =>
        p === currentPackage ? updatedPackage : p
      );
      return {
        ...state,
        [key]: {
          ...state[key],
          requestedPackages
        }
      };
    },
    environmentVariablesChanged: (
      state,
      action: PayloadAction<[string, Record<string, string>]>
    ) => {
      const [key, environmentVariables] = action.payload;
      return {
        ...state,
        [key]: {
          ...state[key],
          environmentVariables
        }
      };
    },
    codeEditorExited: (
      state,
      action: PayloadAction<
        [
          string,
          {
            requestedPackages: (string | CondaSpecificationPip)[];
            channels: string[];
            environmentVariables: Record<string, string>;
          }
        ]
      >
    ) => {
      const [key, { requestedPackages, channels, environmentVariables }] =
        action.payload;
      return {
        ...state,
        [key]: {
          ...state[key],
          requestedPackages,
          channels,
          environmentVariables
        }
      };
    },
    codeEditorContentChanged: (
      state,
      action: PayloadAction<[string, string]>
    ) => {
      const [key, codeEditorContent] = action.payload;
      return {
        ...state,
        [key]: {
          ...state[key],
          codeEditorContent
        }
      };
    },
    showCodeEditorChanged: (
      state,
      action: PayloadAction<[string, boolean]>
    ) => {
      const [key, showCodeEditor] = action.payload;
      return {
        ...state,
        [key]: {
          ...state[key],
          showCodeEditor
        }
      };
    },
    startNewEnvironmentForm: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      return {
        ...state,
        [key]: getNewEnvironmentForm()
      };
    },
    clearNewEnvironmentForm: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      const nextState = { ...state };
      delete nextState[key];
      return nextState;
    }
  }
});

export const {
  nameChanged,
  descriptionChanged,
  channelsChanged,
  requestedPackagesChanged,
  requestedPackageAdded,
  requestedPackageRemoved,
  requestedPackageUpdated,
  environmentVariablesChanged,
  codeEditorExited,
  codeEditorContentChanged,
  showCodeEditorChanged,
  startNewEnvironmentForm,
  clearNewEnvironmentForm
} = environmentCreateSlice.actions;
