import { apiSlice } from "src/features/api";
import { channelsSlice } from "src/features/channels";
import { dependenciesSlice } from "src/features/dependencies";
import { environmentDetailsSlice } from "src/features/environmentDetails";
import { requestedPackagesSlice } from "src/features/requestedPackages";
import { tabsSlice } from "src/features/tabs";
import { enviromentsSlice } from "src/features/metadata";

export const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  channels: channelsSlice.reducer,
  requestedPackages: requestedPackagesSlice.reducer,
  tabs: tabsSlice.reducer,
  enviroments: enviromentsSlice.reducer,
  environmentDetails: environmentDetailsSlice.reducer,
  dependencies: dependenciesSlice.reducer
};
