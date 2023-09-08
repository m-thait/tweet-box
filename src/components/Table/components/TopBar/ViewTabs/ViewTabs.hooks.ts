import { getTableView, useAppSelector } from "@services/redux";

export const useGetTableView = () => {
  const tableView = useAppSelector(getTableView);

  return { tableView };
};
