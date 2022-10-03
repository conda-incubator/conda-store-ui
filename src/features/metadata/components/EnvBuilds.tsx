import React from "react";
import { StyledMetadataItem } from "src/styles/StyledMetadataItem";
import { Build } from "src/features/metadata/components";
import { IApiResponse } from "src/common/interfaces";
import { Build as IBuild } from "src/common/models";
import { buildMapper } from "src/utils/helpers/buildMapper";

interface IData {
  data: IApiResponse<IBuild[]>;
  currentBuildId: number;
}
export const EnvBuilds = ({ data, currentBuildId }: IData) => {
  const builds = data !== undefined ? buildMapper(data, currentBuildId) : [];
  return (
    <>
      <StyledMetadataItem>
        <b>Build</b>
      </StyledMetadataItem>
      <Build builds={builds} />
      <StyledMetadataItem>
        <b>Status:</b> Completed/Building/Failed
      </StyledMetadataItem>
    </>
  );
};
