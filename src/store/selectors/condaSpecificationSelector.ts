import { CondaSpecification } from "src/common/models";
import { RootState } from "../store";

export const selectCondaSpecification = (
  state: RootState
): CondaSpecification => {
  const {
    channels: { channels },
    requestedPackages: { requestedPackages }
  } = state;

  const CondaSpecification: CondaSpecification = {
    channels,
    dependencies: requestedPackages,
    name: "test",
    prefix: null
  };

  return CondaSpecification;
};
