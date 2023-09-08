export const isArrayEqual = (
  arr1: (string | number)[],
  arr2: (string | number)[]
) => {
  const sortedArray1 = [...arr1]?.sort()?.toString();
  const sortedArray2 = [...arr2]?.sort()?.toString();
  return sortedArray1 === sortedArray2 && arr1.length === arr2.length;
};
