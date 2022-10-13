// TODO: fix for jlab
// const apiURL = "http://localhost:5000/conda-store";

const apiURL = process.env.REACT_APP_API_URL;

const artifactList = (
  currentBuildId: number | undefined,
  apiArtifactTypes: string[]
) => {
  if (!currentBuildId) {
    return [];
  }
  const artifact_map = {
    LOCKFILE: {
      name: "Link to lockfile",
      route: `${apiURL}api/v1/build/${currentBuildId}/lockfile/`
    },
    YAML: {
      name: "Link to yml file",
      route: `${apiURL}api/v1/build/${currentBuildId}/yaml/`
    },
    CONDA_PACK: {
      name: "Link to archive",
      route: `${apiURL}api/v1/build/${currentBuildId}/archive/`
    },
    LOGS: {
      name: `Conda Env ${currentBuildId} log`,
      route: `${apiURL}api/v1/build/${currentBuildId}/logs`
    }
  };

  const result = apiArtifactTypes.reduce(
    (acc, cur) => acc.concat(artifact_map[cur as keyof typeof artifactList]),
    []
  );

  return result;
};

export default artifactList;
