import type { Build, CondaSpecification } from "../../../common/models";

function createBuild(id: number, status: string) {
  return {
    id,
    environment_id: 1,
    specification: {
      id: 1,
      name: "test",
      spec: {} as CondaSpecification,
      sha256:
        "697434666a1c747d80df95189ad5750c1496287871779d2a2919db6cb768a182",
      created_on: "2022-11-08T14:28:05.655564"
    },
    packages: [],
    status,
    status_info: null,
    size: 0,
    scheduled_on: "2022-11-08T14:28:05.655564",
    started_on: "2022-11-08T14:28:05.655564",
    ended_on: "2022-11-08T14:28:05.655564",
    build_artifacts: []
  };
}

const completedBuild = createBuild(1, "COMPLETED");
const failedBuild = createBuild(2, "FAILED");
const buildingBuild = createBuild(3, "BUILDING");

export const mockBuilds: Build[] = [completedBuild, failedBuild, buildingBuild];
