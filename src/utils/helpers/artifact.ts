const apiURL = process.env.REACT_APP_API_URL;

const artifactList = (envId: number | undefined) => {
  if (!envId) {
    return [];
  }
  return [
    {
      name: "Link to lockfile",
      route: `${apiURL}/build/${envId}/lockfile/`
    },
    {
      name: "Link to yml file",
      route: `${apiURL}/build/${envId}/yaml/`
    },
    {
      name: "Link to archive",
      route: `${apiURL}/build/${envId}/archive/`
    },
    {
      name: `Conda Env ${envId} log`,
      route: `${apiURL}/build/${envId}/logs`
    }
  ];
};

export default artifactList;
