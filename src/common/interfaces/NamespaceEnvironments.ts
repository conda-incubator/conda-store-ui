import { Environment } from "../models";

export interface INamespaceEnvironments {
  namespace: string;
  environments: Environment[];
  isPrimary?: boolean;
  canCreate?: boolean;
  canUpdate?: boolean;
}
