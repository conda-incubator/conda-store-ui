import { INamespaceEnvironments } from "../../common/interfaces";
import { Environment, Namespace } from "../../common/models";

/**
 * Validate if my own namespace is already listed in the namespace array.
 *
 * @param list - list of namespaces
 * @param primaryNamespace - primary namespace
 * @returns true or false if the namespace is listed
 */
export const isNamespaceListed = (list: any, primaryNamespace: Namespace) => {
  if (
    primaryNamespace.name === "default" ||
    list.some((item: Namespace) => item.name === primaryNamespace.name)
  ) {
    return true;
  }
  return false;
};

/**
 * Identify which of the listed namespaces is my primary.
 *
 * @param list - list of namespaces
 * @param primaryNamespace - primary namespace
 * @returns an array with a new property called isPrimary
 */
export const checkMyPrimaryNamespace = (
  list: any,
  primaryNamespace: Namespace
) => {
  return list.map((item: { name: string }) => {
    if (item.name === primaryNamespace.name) {
      return {
        ...item,
        isPrimary: primaryNamespace.name !== "default"
      };
    }
    return item;
  });
};

/**
 * Environments are grouped according to their own namespaces.
 *
 * @param environmentsList - list of environments
 * @param primaryNamespace - primary namespace
 * @returns a new array with namespace info
 */
export const groupEnvsByNamespace = (
  environmentsList: Environment[],
  primaryNamespace: Namespace | undefined
): INamespaceEnvironments[] => {
  return environmentsList.reduce((acc: any, curr: any) => {
    // initialize with primary namespace
    if (primaryNamespace && !acc[primaryNamespace.name]) {
      acc[primaryNamespace.name] = {
        isPrimary: true,
        environments: [],
        namespace: primaryNamespace.name
      };
    }
    // set the initial value per each namespace
    if (!acc[curr.namespace.name]) {
      acc[curr.namespace.name] = {
        namespace: curr.namespace.name,
        environments: [],
        isPrimary: true
      };
    }
    // fill every position with current namespace data
    acc[curr.namespace.name] = {
      namespace: curr.namespace.name,
      environments: [...acc[curr.namespace.name].environments, curr],
      isPrimary: curr.namespace.name === primaryNamespace?.name
    };
    return acc;
  }, {});
};

/**
 * Return your primary namespace
 *
 * @param namespaces - list of namespaces
 * @returns an object with your primary namespace info
 */
export const getMyPrimaryNamespace = (
  namespaces: INamespaceEnvironments[]
): INamespaceEnvironments | undefined => {
  return Object.values(namespaces).find((namespace: INamespaceEnvironments) => {
    if (namespace.isPrimary) {
      return {
        namespace: namespace.namespace,
        environments: namespace.environments
      };
    }
    return undefined;
  });
};

/**
 * Return your shared namespaces
 *
 * @param namespaces - list of namespaces
 * @returns an array with your shared namespaces info
 */
export const getSharedNamespaces = (
  namespaces: INamespaceEnvironments[]
): INamespaceEnvironments[] => {
  return Object.values(namespaces).filter(
    (namespace: INamespaceEnvironments) => {
      if (!namespace.isPrimary) {
        return {
          namespace: namespace.namespace,
          environments: namespace.environments
        };
      }
      return undefined;
    }
  );
};
