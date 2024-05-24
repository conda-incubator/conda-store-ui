import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Namespace } from "../../common/models";

export interface INamespacesState {
  page: number;
  data: Namespace[];
  count: number;
}

export const initialState: INamespacesState = {
  page: 1,
  data: [],
  count: 0
};

export const namespacesSlice = createSlice({
  name: "namespaces",
  initialState,
  reducers: {
    dataFetched: (
      state: INamespacesState,
      action: PayloadAction<{ data: Namespace[]; count: number }>
    ) => {
      const { count, data } = action.payload;
      return { ...state, count: count, data: data };
    }
  }
});

export const { dataFetched } = namespacesSlice.actions;
