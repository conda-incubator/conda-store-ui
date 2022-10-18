import React, { useEffect, useState } from "react";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import { Build } from "../../../features/metadata/components";
import { IApiResponse } from "../../../common/interfaces";
import { Build as IBuild } from "../../../common/models";
import { buildMapper } from "../../../utils/helpers/buildMapper";
import { CircularProgress } from "@mui/material";

interface IData {
  data: IApiResponse<IBuild[]>;
  currentBuildId: number;
}

export const EnvBuilds = ({ data, currentBuildId }: IData) => {
  const { data: envData = [] } = data;
  const builds = envData.length ? buildMapper(data, currentBuildId) : [];
  const currentBuild = builds.find(build => build.id === currentBuildId);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (builds.length) {
      if (status === "") {
        setStatus(currentBuild?.status);
      }
    }
  }, [builds]);

  return (
    <>
      <StyledMetadataItem>
        <b>Build</b>
      </StyledMetadataItem>
      {currentBuild && (
        <Build
          builds={builds}
          currentBuildName={currentBuild.name}
          onChangeStatus={setStatus}
        />
      )}
      {!currentBuild && (
        <CircularProgress
          size={20}
          sx={{ marginLeft: "15px", marginTop: "6px", marginBottom: "7px" }}
        />
      )}
      <StyledMetadataItem>
        <b>Status:</b> {status}
      </StyledMetadataItem>
    </>
  );
};
