interface ILabelInterface {
  [key: string]: string;
}

export default function createLabel(name: string | undefined, type: string) {
  const types: ILabelInterface = {
    create: `The environment ${name} is being created`,
    update: `The environment ${name} has been updated`,
    updateBuild: `The environment ${name} has been updated with the selected build`,
    delete: `The environment ${name} has been deleted`,
    error: "An error occurred while processing your request",
    confirm: `Are you sure you want to delete the environment: ${name}?`
  };
  return types[type];
}
