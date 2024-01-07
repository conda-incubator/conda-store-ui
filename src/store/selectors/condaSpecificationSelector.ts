import { CondaSpecification } from "../../common/models";
import { RootState } from "../store";

export const selectCondaSpecification = (
  state: RootState
): CondaSpecification => {
  const {
    channels: { channels },
    requestedPackages: { requestedPackages },
    environmentCreate: { variables },
    environmentDetails: { name, prefix }
  } = state;

  const condaSpecification: CondaSpecification = {
    channels,
    dependencies: requestedPackages,
    name,
    prefix,
    variables: variables
  };

  return condaSpecification;
};
