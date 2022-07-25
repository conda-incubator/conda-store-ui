import { channelsSlice } from "src/features/channels";
import { environmentDetailsSlice } from "src/features/environmentDetails";
import { requestedPackagesSlice } from "src/features/requestedPackages";

export const rootReducer = {
  channels: channelsSlice.reducer,
  requestedPackages: requestedPackagesSlice.reducer,
  environmentDetails: environmentDetailsSlice.reducer
};
