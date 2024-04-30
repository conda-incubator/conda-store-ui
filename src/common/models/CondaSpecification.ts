import { CondaSpecificationPip } from "./CondaSpecificationPip";

export type CondaSpecification = {
  name: string;
  channels: string[];
  dependencies: (string | CondaSpecificationPip)[];
  variables: Record<string, string>;
  prefix?: string | null;
  lockfile?: any | null;
};
