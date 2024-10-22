import { format, utcToZonedTime } from "date-fns-tz";
import { Build } from "../../common/models";

const STATUS_OPTIONS: { [key: Build["status"]]: string } = {
  COMPLETED: "Available",
  QUEUED: "Queued",
  FAILED: "Failed",
  BUILDING: "Building",
  CANCELED: "Canceled"
};

const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
    let option = `${dateToTimezone(ended_on ?? scheduled_on)} - Active`;
    if (status !== "COMPLETED") {
      option += " - " + STATUS_OPTIONS[status];
    }
    return option;
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
    case "COMPLETED":
      if (ended_on && scheduled_on) {
        const startTime = new Date(scheduled_on);
        const endTime = new Date(ended_on);
        let duration = (endTime.valueOf() - startTime.valueOf()) / 60000;
        duration = Math.round(duration);
        if (duration > 0) {
          return `Completed in ${duration} min`;
        }
      }
      return "Completed";
    default:
      return STATUS_OPTIONS[status];
  }
};
