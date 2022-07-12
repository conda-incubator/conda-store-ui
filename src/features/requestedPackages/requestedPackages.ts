import { createSlice } from "@reduxjs/toolkit";

export interface IRequestedPackagesState {
  requestedPackages: (string | object)[];
}

const initialState: IRequestedPackagesState = {
  requestedPackages: []
};

export const requestedPackagesSlice = createSlice({
  name: "requestedPackages",
  initialState,
  reducers: {}
});
