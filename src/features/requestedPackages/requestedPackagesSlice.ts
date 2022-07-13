import { createSlice } from "@reduxjs/toolkit";
import { PipSpecification } from "src/common/models";

export interface IRequestedPackagesState {
  requestedPackages: (string | PipSpecification)[];
}

const initialState: IRequestedPackagesState = {
  requestedPackages: []
};

export const requestedPackagesSlice = createSlice({
  name: "requestedPackages",
  initialState,
  reducers: {}
});
