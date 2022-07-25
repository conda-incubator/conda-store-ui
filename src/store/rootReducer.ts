import { apiSlice } from "src/features/api";
import { channelsSlice } from "src/features/channels";
import { requestedPackagesSlice } from "src/features/requestedPackages";

export const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  channels: channelsSlice.reducer,
  requestedPackages: requestedPackagesSlice.reducer
};
