import React from "react";
import { useAppSelector } from "../../../hooks";
import { BlockContainer } from "../../../components";
import { Description, EnvBuilds } from "../../../features/metadata/components";
import { StyledButtonPrimary } from "../../../styles";

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
  description: string;
  mode: "create" | "read-only" | "edit";
  currentBuildId?: number | undefined;
  selectedBuildId?: number;
  defaultEnvVersIsChanged?: boolean;
  specificationIsChanged?: boolean;
  onDefaultEnvIsChanged?: (defaultEnvVersIsChanged: boolean) => void;
  onUpdateDescription: (description: string) => void;
  onUpdateBuildId: (buildId: number) => void;
}

export const EnvMetadata = ({
  mode,
  description,
  currentBuildId,
  selectedBuildId,
  specificationIsChanged,
  onDefaultEnvIsChanged,
  onUpdateDescription,
  onUpdateBuildId
}: IEnvMetadataProps) => {
  const { builds, newCurrentBuild } = useAppSelector(
    state => state.enviroments
  );

  const defaultEnvironmentChanged = (newCurrentBuild: number) => {
    onUpdateBuildId(newCurrentBuild);
    if (onDefaultEnvIsChanged) {
      onDefaultEnvIsChanged(true);
    }
  };

  const specificationDidChange = () => {
    if (specificationIsChanged) {
      return specificationIsChanged;
    } else {
      return false;
    }
  };

  return (
    <BlockContainer title="Environment Metadata">
      <Description
        mode={mode}
        description={description}
        onChangeDescription={onUpdateDescription}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}
      >
        {mode !== EnvironmentDetailsModes.CREATE &&
          currentBuildId &&
          selectedBuildId && (
            <div>
              <EnvBuilds
                currentBuildId={currentBuildId}
                selectedBuildId={selectedBuildId}
                builds={builds}
                mode={mode}
              />
            </div>
          )}

        {mode === EnvironmentDetailsModes.EDIT &&
          newCurrentBuild &&
          currentBuildId !== newCurrentBuild && (
            <StyledButtonPrimary
              variant="contained"
              onClick={() => defaultEnvironmentChanged(newCurrentBuild)}
              disabled={specificationDidChange()}
            >
              Change environment version
            </StyledButtonPrimary>
          )}
      </div>
    </BlockContainer>
  );
};
