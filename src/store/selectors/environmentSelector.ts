import { Environment } from "src/common/models";
import { RootState } from "../store";

export const selectEnvironment = (state: RootState): Environment => {
  const {
    channels: { channels },
    requestedPackages: { requestedPackages }
  } = state;

  const environment: Environment = {
    name: "test",
    channels,
    dependencies: requestedPackages,
    prefix: null
  };

  return environment;
};
