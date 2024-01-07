import { createSlice } from "@reduxjs/toolkit";
import { environmentDetailsApiSlice } from "../environmentDetails";

export interface IVariablesState {
  variables: Record<string, string>;
}

const initialState: IVariablesState = { variables: {} };

export const variablesSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    updateVariables: (state, action) => {
      const variables = action.payload;
      state.variables = variables;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      environmentDetailsApiSlice.endpoints.getBuild.matchFulfilled,
      (
        state,
        {
          payload: {
            data: {
              specification: {
                spec: { variables }
              }
            }
          }
        }
      ) => {
        state.variables = variables;
      }
    );
  }
});

export const { updateVariables } = variablesSlice.actions;
