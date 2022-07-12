export type Environment = {
  name: string;
  channels: string[];
  dependencies: (string | object)[];
  prefix?: string | null;
};
