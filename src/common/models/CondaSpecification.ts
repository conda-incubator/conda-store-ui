import { CondaSpecificationPip } from "./CondaSpecificationPip";

export type CondaSpecification = {
  name: string;
  channels: string[];
  dependencies: (string | CondaSpecificationPip)[];
  environmentVariables: Record<string, string>;
  prefix?: string | null;
};
