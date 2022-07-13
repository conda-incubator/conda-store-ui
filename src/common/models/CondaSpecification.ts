import { PipSpecification } from "./PipSpecification";

export type CondaSpecification = {
  name: string;
  channels: string[];
  dependencies: (string | PipSpecification)[];
  prefix?: string | null;
};
