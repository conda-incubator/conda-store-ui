import { apiSlice } from "../features/api";
import { authSlice } from "../features/auth";
import { channelsSlice } from "../features/channels";
import { dependenciesSlice } from "../features/dependencies";
import { environmentDetailsSlice } from "../features/environmentDetails";
import { requestedPackagesSlice } from "../features/requestedPackages";
import { tabsSlice } from "../features/tabs";
import { enviromentsSlice } from "../features/metadata";

export const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  channels: channelsSlice.reducer,
  requestedPackages: requestedPackagesSlice.reducer,
  tabs: tabsSlice.reducer,
  enviroments: enviromentsSlice.reducer,
  environmentDetails: environmentDetailsSlice.reducer,
  dependencies: dependenciesSlice.reducer,
  auth: authSlice.reducer
};
