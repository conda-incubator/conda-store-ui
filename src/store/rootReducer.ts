import { apiSlice } from "src/features/api";
import { channelsSlice } from "src/features/channels";
import { dependenciesSlice } from "src/features/dependencies";
import { environmentDetailsSlice } from "src/features/environmentDetails";
import { requestedPackagesSlice } from "src/features/requestedPackages";

export const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  channels: channelsSlice.reducer,
  requestedPackages: requestedPackagesSlice.reducer,
  environmentDetails: environmentDetailsSlice.reducer,
  dependenciesSlice: dependenciesSlice.reducer
};
