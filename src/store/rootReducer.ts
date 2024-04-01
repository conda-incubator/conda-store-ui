import { apiSlice } from "../features/api";
import { channelsSlice } from "../features/channels";
import { dependenciesSlice } from "../features/dependencies";
import { environmentDetailsSlice } from "../features/environmentDetails";
import { requestedPackagesSlice } from "../features/requestedPackages";
import { environmentVariablesSlice } from "../features/environmentVariables";
import { tabsSlice } from "../features/tabs";
import { enviromentsSlice } from "../features/metadata";
import { environmentCreateSlice } from "../features/environmentCreate/environmentCreateSlice";
import { namespacesSlice } from "../features/namespaces/reducer";
import { environmentsSlice } from "../features/environments/reducer";
import { notificationSlice } from "../features/notification/notificationSlice";

export const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  channels: channelsSlice.reducer,
  requestedPackages: requestedPackagesSlice.reducer,
  environmentVariables: environmentVariablesSlice.reducer,
  tabs: tabsSlice.reducer,
  enviroments: enviromentsSlice.reducer,
  environmentDetails: environmentDetailsSlice.reducer,
  dependencies: dependenciesSlice.reducer,
  environmentCreate: environmentCreateSlice.reducer,
  namespaces: namespacesSlice.reducer,
  environments: environmentsSlice.reducer,
  notification: notificationSlice.reducer
};
