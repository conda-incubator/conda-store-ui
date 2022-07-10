interface IArgs {
  list: string[];
  startIndex: number;
  endIndex: number;
}

const reorderArray = ({ list, startIndex, endIndex }: IArgs) => {
  const result = JSON.parse(JSON.stringify(list));
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorderArray;
