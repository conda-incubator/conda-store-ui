import { format } from "date-fns";
import { IApiResponse } from "src/common/interfaces";
import { Build } from "src/common/models";

const STATUS_OPTIONS: any = {
  COMPLETED: "Available",
  QUEUED: "Building",
  FAILED: "Failed",
  BUILDING: "Building"
};

export const buildMapper = ({ data }: IApiResponse<Build[]>) => {
  return data.map(({ status, ended_on }: any) => {
    const date = format(new Date(ended_on), "MMMM do, yyyy - h:mm");
    return `${date} - ${STATUS_OPTIONS[status]}`;
  });
};
