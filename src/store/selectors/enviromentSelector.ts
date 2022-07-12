import { RootState } from "../store";

export const selectEnvironment = (state: RootState) => {
  const {
    channels: { channels },
    requestedPackages: { requestedPackages }
  } = state;

  const environment = {
    channels,
    dependencies: requestedPackages
  };

  return environment;
};
