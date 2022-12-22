import { NAMESPACES, ENVIRONMENTS } from "../testutils";
import {
  isNamespaceListed,
  checkMyPrimaryNamespace,
  groupEnvsByNamespace,
  getMyPrimaryNamespace,
  getSharedNamespaces
} from "../../src/utils/helpers/namespaces";

const NEW_NAMESPACE = {
  id: 2,
  name: "undefined-namespace"
};

const PARSED_NAMESPACES = [
  {
    namespace: "default",
    environments: []
  },
  {
    namespace: "admin",
    environments: [],
    isPrimary: true
  }
];

describe("namespaces", () => {
  describe("isNamespaceListed", () => {
    it("should return true if the namespace is present", () => {
      const isListed = isNamespaceListed(
        [NEW_NAMESPACE, ...NAMESPACES],
        NAMESPACES[0]
      );
      expect(isListed).toBeTruthy();
    });

    it("should return false if the namespace is not present", () => {
      const isListed = isNamespaceListed(NAMESPACES, NEW_NAMESPACE);
      expect(isListed).toBeFalsy();
    });
  });

  describe("checkMyPrimaryNamespace", () => {
    it("should return an array with a new prop called isPrimary as true if the primary namespace is listed", () => {
      const namespaces = checkMyPrimaryNamespace(NAMESPACES, NAMESPACES[1]);
      expect(namespaces[1]).toEqual({
        ...namespaces[1],
        isPrimary: true
      });
    });

    it("should return an array without isPrimary prop", () => {
      const namespaces = checkMyPrimaryNamespace(NAMESPACES, NEW_NAMESPACE);
      expect(namespaces).toEqual(NAMESPACES);
    });
  });

  describe("groupEnvsByNamespace", () => {
    it("should group environments by namespace prop", () => {
      const envsGroupedByNamespace = groupEnvsByNamespace(ENVIRONMENTS, {
        id: 1,
        name: "admin"
      });

      expect(envsGroupedByNamespace["default"].environments).toHaveLength(2);
      expect(envsGroupedByNamespace["admin"].environments).toHaveLength(0);
    });
  });

  describe("getMyPrimaryNamespace", () => {
    it("should return my primary namespace", () => {
      const myPrimaryNamespace = getMyPrimaryNamespace(PARSED_NAMESPACES);
      expect(myPrimaryNamespace).toEqual(PARSED_NAMESPACES[1]);
    });
  });

  describe("getSharedNamespaces", () => {
    it("should return my shared namespaces", () => {
      const myPrimaryNamespace = getSharedNamespaces(PARSED_NAMESPACES);
      expect(myPrimaryNamespace).toEqual([PARSED_NAMESPACES[0]]);
    });
  });
});
