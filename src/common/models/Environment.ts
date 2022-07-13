import { PipSpecification } from "./PipSpecification";

export type Environment = {
  name: string;
  channels: string[];
  dependencies: (string | PipSpecification)[];
  prefix?: string | null;
};
