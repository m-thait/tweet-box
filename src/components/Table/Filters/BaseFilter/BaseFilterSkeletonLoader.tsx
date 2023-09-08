import { ListItem, Skeleton } from "@mui/material";
import React from "react";

export const BaseFilterSkeletonLoader = () => {
  return (
    <>
      {Array.from(new Array(14).keys()).map((i) => (
        <Skeleton key={`base-filter-skeleton-row-${i}`}>
          <ListItem style={{ height: "22px", width: "212px" }} />
        </Skeleton>
      ))}
    </>
  );
};
