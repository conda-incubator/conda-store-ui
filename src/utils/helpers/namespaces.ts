import { INamespaceEnvironments } from "../../common/interfaces";
import { Environment, Namespace } from "../../common/models";

const DEFAULT = "default";
const PERMISSIONS = {
  environmentUpdate: "environment::update",
  namespaceCreate: "namespace::create",
  environmentDelete: "environment::delete"
};

/**
 * Validate if my own namespace is already listed in the namespace array.
 *
 * @param list - list of namespaces
 * @param primaryNamespace - primary namespace
 * @returns true or false if the namespace is listed
 */
export const isNamespaceListed = (list: any, primaryNamespace: Namespace) => {
  if (
    primaryNamespace.name === DEFAULT ||
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
        isPrimary: primaryNamespace.name !== DEFAULT,
        canUpdate: true,
        canCreate: true
      };
    }
    return item;
  });
};

/**
 * Environments are grouped according to their own namespaces.
 *
 * @param environmentsList - list of environments
 */
export const groupEnvsByNamespace = (environmentsList: Environment[]) => {
  return environmentsList.reduce((acc: any, curr: any) => {
    if (!acc[curr.namespace.name]) {
      acc[curr.namespace.name] = [];
    }

    acc[curr.namespace.name] = [...acc[curr.namespace.name], curr];
    return acc;
  }, {});
};

/**
 * Map the namespace array to add the environments
 *
 * @param environmentsList - list of environments
 * @param namespacesList - list of namespaces
 * @returns a new namespace array with their enviroments included
 */
export const namespaceMapper = (
  environmentsList: Environment[],
  namespacesList: Namespace[]
) => {
  const environments = groupEnvsByNamespace(environmentsList);
  return namespacesList.map((namespace: Namespace) => {
    return {
      namespace: namespace.name,
      environments: environments[namespace.name] ?? [],
      isPrimary: !!namespace.isPrimary,
      canCreate: namespace.canCreate,
      canUpdate: namespace.canUpdate
    };
  });
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

export const namespacesPermissionsMapper = (
  namespaces: Namespace[],
  permissions: any
) => {
  return namespaces.map((namespace: Namespace) => {
    const entity = `${namespace.name}/*`;
    const allPermissions = permissions.data.entity_permissions["*/*"];
    const namespacePermissions =
      permissions.data.entity_permissions[entity] ?? [];

    return {
      id: namespace.id,
      name: namespace.name,
      canCreate: allPermissions
        ? true
        : namespacePermissions.includes(PERMISSIONS.namespaceCreate),
      canUpdate: allPermissions
        ? true
        : namespacePermissions.includes(PERMISSIONS.environmentUpdate)
    };
  });
};
