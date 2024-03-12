import { format, utcToZonedTime } from "date-fns-tz";
import { Build } from "../../common/models";

const STATUS_OPTIONS: { [key: string]: string } = {
  COMPLETED: "Available",
  QUEUED: "Queued",
  FAILED: "Failed",
  BUILDING: "Building"
};

const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

const isCompleted = (status: string, duration: number) => {
  if (status === "COMPLETED") {
    if (duration > 0) {
      return `Completed in ${duration} min`;
    }
    return "Completed";
  }
  return STATUS_OPTIONS[status];
};

const dateToTimezone = (date: string) => {
  if (!date) {
    return "";
  }
  const zonedDate = utcToZonedTime(`${date}Z`, TIMEZONE);
  return format(zonedDate, "MMMM do, yyyy - h:mm a", {
    timeZone: TIMEZONE
  });
};

export const buildDatetimeStatus = (
  { id, status, ended_on, scheduled_on }: Build,
  currentBuildId: number
): string => {
  if (id === currentBuildId) {
    return `${dateToTimezone(ended_on ?? scheduled_on)} - Active`;
  } else if (status === "BUILDING") {
    return `${dateToTimezone(scheduled_on)} - Building`;
  } else if (status === "QUEUED") {
    return `${dateToTimezone(scheduled_on)} - Queued`;
  } else {
    return `${dateToTimezone(ended_on ?? scheduled_on)} - ${
      STATUS_OPTIONS[status]
    }`;
  }
};

export const buildStatus = ({
  status,
  ended_on,
  scheduled_on
}: Build): string => {
  switch (status) {
    case "BUILDING":
    case "QUEUED":
      return "Building";
    default: {
      let duration = 0;
      if (ended_on && scheduled_on) {
        const startTime = new Date(scheduled_on);
        const endTime = new Date(ended_on);
        duration = (endTime.valueOf() - startTime.valueOf()) / 60000;
        duration = Math.round(duration);
      }
      return isCompleted(status, duration);
    }
  }
};
