import { CondaSpecification } from "src/common/models";
import { RootState } from "../store";

export const selectCondaSpecification = (
  state: RootState
): CondaSpecification => {
  const {
    channels: { channels },
    requestedPackages: { requestedPackages },
    environmentDetails: { name, prefix }
  } = state;

  const condaSpecification: CondaSpecification = {
    channels,
    dependencies: requestedPackages,
    name,
    prefix
  };

  return condaSpecification;
};
