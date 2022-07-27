import { Environment } from "../models";

export interface INamespaceEnvironments {
  namespace: string;
  environments: Environment[];
}
