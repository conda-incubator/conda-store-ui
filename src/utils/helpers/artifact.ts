const apiURL = process.env.REACT_APP_API_URL;

const artifactList = (currentBuildId: number | undefined) => {
  if (!currentBuildId) {
    return [];
  }
  return [
    {
      name: "Link to lockfile",
      route: `${apiURL}/api/v1/build/${currentBuildId}/lockfile/`
    },
    {
      name: "Link to yml file",
      route: `${apiURL}/api/v1/build/${currentBuildId}/yaml/`
    },
    {
      name: "Link to archive",
      route: `${apiURL}/api/v1/build/${currentBuildId}/archive/`
    },
    {
      name: `Conda Env ${currentBuildId} log`,
      route: `${apiURL}/api/v1/build/${currentBuildId}/logs`
    }
  ];
};

export default artifactList;
