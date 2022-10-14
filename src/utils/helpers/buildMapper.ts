import { format } from "date-fns";
import { IApiResponse } from "../../common/interfaces";
import { Build } from "../../common/models";

const STATUS_OPTIONS: any = {
  COMPLETED: "Available",
  QUEUED: "Queued",
  FAILED: "Failed",
  BUILDING: "Building"
};

const isBuilding = (status: string) => {
  const BUILD_STATUS = ["BUILDING"];
  return BUILD_STATUS.includes(status);
};

const isQueued = (status: string) => {
  const BUILD_STATUS = ["QUEUED"];
  return BUILD_STATUS.includes(status);
};

export const buildMapper = (
  { data }: IApiResponse<Build[]>,
  currentBuildId: number
) => {
  return data.map(({ id, status, ended_on, scheduled_on }: Build) => {
    const dateDetails = isBuilding(status) ? scheduled_on : ended_on;
    const date = format(new Date(dateDetails), "MMMM do, yyyy - h:mm");

    if (isBuilding(status)) {
      return {
        id,
        name: `${date} - Building`
      };
    }

    if (isQueued(status)) {
      return {
        id,
        name: `${date} - Queued`
      };
    }

    if (id === currentBuildId) {
      return {
        id,
        name: `${date} - Active`
      };
    }

    return {
      id,
      name: `${date} - ${STATUS_OPTIONS[status]}`
    };
  });
};
