import { channelsSlice } from "src/features/channels/channelsSlice";
import { requestedPackagesSlice } from "src/features/requestedPackages/requestedPackagesSlice";

export const rootReducer = {
  channels: channelsSlice.reducer,
  requestedPackages: requestedPackagesSlice.reducer
};
