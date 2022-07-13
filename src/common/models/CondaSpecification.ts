import { CondaSpecificationPip } from "./CondaSpecificationPip";

export type CondaSpecification = {
  name: string;
  channels: string[];
  dependencies: (string | CondaSpecificationPip)[];
  prefix?: string | null;
};
