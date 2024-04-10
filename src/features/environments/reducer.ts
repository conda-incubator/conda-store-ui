import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Environment } from "../../common/models";

export interface IEnvironmentsState {
  page: number;
  data: Environment[];
  count: number;
  search: string;
}

export const initialState: IEnvironmentsState = {
  page: 1,
  data: [],
  count: 0,
  search: ""
};

export const environmentsSlice = createSlice({
  name: "environments",
  initialState,
  reducers: {
    dataFetched: (
      state: IEnvironmentsState,
      action: PayloadAction<{ data: Environment[]; count: number }>
    ) => {
      const { count, data } = action.payload;

      return { ...state, count: count, data: data };
    },
    searched: (
      state: IEnvironmentsState,
      action: PayloadAction<{
        data: Environment[];
        count: number;
        search: string;
      }>
    ) => {
      return { ...action.payload, page: 1 };
    },
    nextFetched: (
      state: IEnvironmentsState,
      action: PayloadAction<{ data: Environment[]; count: number }>
    ) => {
      const { data, count } = action.payload;

      const newData = state.data?.concat(data);
      const nextPage = state.page + 1;

      return {
        ...state,
        data: newData,
        count: count,
        page: nextPage
      };
    }
  }
});

export const { dataFetched, searched, nextFetched } = environmentsSlice.actions;
