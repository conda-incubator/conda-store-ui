export type Dependency = {
  id: number;
  channel: {
    id: number;
    name: string;
    last_update: Date | null;
  };
  build: string;
  license: string;
  sha256: string;
  name: string;
  version: string;
  summary: string;
};
