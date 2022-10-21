const artifactList = (currentBuildId: number | undefined) => {
  if (!currentBuildId) {
    return [];
  }
  return [
    {
      name: "Link to lockfile",
      route: `api/v1/build/${currentBuildId}/lockfile/`
    },
    {
      name: "Link to yml file",
      route: `api/v1/build/${currentBuildId}/yaml/`
    },
    {
      name: "Link to archive",
      route: `api/v1/build/${currentBuildId}/archive/`
    },
    {
      name: `Conda Env ${currentBuildId} log`,
      route: `api/v1/build/${currentBuildId}/logs`
    }
  ];
};

export default artifactList;
