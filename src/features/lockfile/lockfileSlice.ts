import { createSlice } from "@reduxjs/toolkit";
import { environmentDetailsApiSlice } from "../environmentDetails";

export interface ILockfileState {
  lockfile: any;
}

const initialState: ILockfileState = { lockfile: {} };

export const lockfileSlice = createSlice({
  name: "lockfile",
  initialState,
  reducers: {
    updateLockfile: (state, action) => {
      const lockfile = action.payload;
      state.lockfile = lockfile;
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
              specification: { spec }
            }
          }
        }
      ) => {
        // checks if this is a lockfile specification
        const lockfile = spec?.lockfile ?? {};

        state.lockfile = lockfile;
      }
    );
  }
});

export const { updateLockfile } = lockfileSlice.actions;
