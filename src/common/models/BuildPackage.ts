export type BuildPackage = {
  id: number;
  channel: {
    id: number;
    name: string;
    last_update: string;
  };
  build: string;
  license: string;
  sha256: string;
  name: string;
  version: string;
  summary: string;
};
