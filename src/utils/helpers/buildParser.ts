import moment from "moment";
interface IBuildParser {
  status: string;
  data: {
    id: number;
    environment_id: number;
    specification: null;
    packages: null;
    status: string;
    size: number;
    scheduled_on: string;
    started_on: string;
    ended_on: string;
    build_artifacts: null;
  }[];
  message: null;
  page: number;
  size: number;
  count: number;
}
export const buildParser = ({ data }: IBuildParser): any => {
  const build_data = data.map((data: any) => {
    const status = data.status;
    const date = moment(data.ended_on).format("MMMM Do, YYYY - h:mm");
    return `${date} - ${status}`;
  });
  return build_data;
};
