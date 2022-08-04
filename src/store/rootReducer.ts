import { apiSlice } from "src/features/api";
import { channelsSlice } from "src/features/channels";
import { requestedPackagesSlice } from "src/features/requestedPackages";
import { enviromentsSlice } from "src/features/metadata";

export const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  channels: channelsSlice.reducer,
  requestedPackages: requestedPackagesSlice.reducer,
  enviroments: enviromentsSlice.reducer
};
