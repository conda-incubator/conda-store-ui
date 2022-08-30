export type Environment = {
  id: number;
  namespace: { id: number; name: string };
  name: string;
  current_build_id: number;
  current_build: number | null;
  description: string;
};
