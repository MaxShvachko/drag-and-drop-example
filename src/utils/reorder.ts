export const reorder = <T extends Array<unknown>>(list: T, startIndex: number, endIndex: number) => {
  const result = [...list];
  const [removed] = result.splice(startIndex - 1, 1);
  result.splice(endIndex - 1, 0, removed);

  return result;
};
