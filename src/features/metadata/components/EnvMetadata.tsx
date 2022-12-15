import React from "react";
import { BlockContainer } from "../../../components";
import { Description, EnvBuilds } from "../../../features/metadata/components";

export enum EnvironmentDetailsModes {
  "CREATE" = "create",
  "READ" = "read-only",
  "EDIT" = "edit"
}
interface IEnvMetadataProps {
  /**
   * @param mode change whether the component only displays the list of builds, edit the environment description or create a new description
   * @param onUpdateDescription change environment description
   */
  description?: any;
  mode: "create" | "read-only" | "edit";
  currentBuildId?: number | undefined;
  selectedBuildId?: number;
  onUpdateDescription: (description: string) => void;
}

export const EnvMetadata = ({
  mode,
  description = "",
  currentBuildId,
  selectedBuildId,
  onUpdateDescription
}: IEnvMetadataProps) => {
  return (
    <BlockContainer title="Environment Metadata">
      <Description
        mode={mode}
        description={description || undefined}
        onChangeDescription={onUpdateDescription}
      />
      {mode !== EnvironmentDetailsModes.CREATE &&
        currentBuildId &&
        selectedBuildId && <EnvBuilds selectedBuildId={selectedBuildId} />}
    </BlockContainer>
  );
};
