import { channelsSlice } from "src/features/channels";
import { requestedPackagesSlice } from "src/features/requestedPackages";

export const rootReducer = {
  channels: channelsSlice.reducer,
  requestedPackages: requestedPackagesSlice.reducer
};
