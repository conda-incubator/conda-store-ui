export type Namespace = {
  id: number | undefined;
  name: string;
  isPrimary?: boolean;
  canUpdate?: boolean;
  canCreate?: boolean;
};
