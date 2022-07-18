import { createSlice } from "@reduxjs/toolkit";
import { CondaSpecificationPip } from "src/common/models";

export interface IRequestedPackagesState {
  requestedPackages: (string | CondaSpecificationPip)[];
}

const initialState: IRequestedPackagesState = {
  requestedPackages: []
};

export const requestedPackagesSlice = createSlice({
  name: "requestedPackages",
  initialState,
  reducers: {}
});
