import { BuildArtifact } from "./BuildArtifact";
import { BuildPackage } from "./BuildPackage";
import { CondaSpecification } from "./CondaSpecification";

export type Build = {
  id: number;
  environment_id: number;
  specification: {
    id: number;
    name: string;
    spec: CondaSpecification;
    sha256: string;
    created_on: string;
  };
  packages: BuildPackage[];
  status: string;
  size: number;
  scheduled_on: string;
  started_on: string;
  ended_on: string | null;
  build_artifacts: BuildArtifact[];
};
