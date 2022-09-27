const apiURL = process.env.REACT_APP_API_URL;

const artifactList = (envId: number | undefined) => {
  if (!envId) {
    return [];
  }
  return [
    {
      name: "Link to lockfile",
      route: `${apiURL}/api/v1/build/${envId}/lockfile/`
    },
    {
      name: "Link to yml file",
      route: `${apiURL}/api/v1/build/${envId}/yaml/`
    },
    {
      name: "Link to archive",
      route: `${apiURL}/api/v1/build/${envId}/archive/`
    },
    {
      name: `Conda Env ${envId} log`,
      route: `${apiURL}/api/v1/build/${envId}/logs`
    }
  ];
};

export default artifactList;
