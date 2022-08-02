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
  packages: any; // it is not clear what type this attribute is
  status: string;
  size: number;
  scheduled_on: string;
  started_on: string;
  ended_on: string;
  build_artifacts: { id: number; artifact_type: string; key: string }[];
};
