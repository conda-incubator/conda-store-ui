import type { CondaSpecificationPip } from "./CondaSpecificationPip";
import type { Lockfile } from "./Lockfile";

export type CondaSpecification = {
  name: string;
  channels: string[];
  dependencies: (string | CondaSpecificationPip)[];
  variables: Record<string, string>;
  prefix?: string | null;
  lockfile?: Lockfile;
};
