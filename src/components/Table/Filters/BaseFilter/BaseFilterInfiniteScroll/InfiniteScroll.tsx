import { Box, ListItem, Skeleton } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import React, { useState } from "react";
import {
  BaseFilterInfiniteScrollProps,
  FilterListOptionsProps,
} from "@components/Table/Filters/BaseFilter/BaseFilter.types";
import { renderFilterOptions } from "@components/Table/Filters/BaseFilter/FilterOptions";

/*
 * TODO: Base Filter Infinite Scroll functionality can be improved;
 * Currently, records continue loading even when user is not scrolling filter menu.
 * story to address this: https://ma-contentsolutions.atlassian.net/browse/MDCPT-17439
 */
export const BaseFilterInfiniteScroll = ({
  fieldName,
  filteredValues,
  selectedIndices,
  handleChange,
  lockedOrgIds,
  createBaseFilterObj,
  filterSortOrder,
  setColorForFieldsProp,
  infiniteScrollHasMore,
  setInfiniteScrollHasMore,
}: BaseFilterInfiniteScrollProps) => {
  const itemsPerScroll = 100;
  const [records, setRecords] = useState(itemsPerScroll);

  const loadMore = () => {
    if (records >= filteredValues.length) {
      if (setInfiniteScrollHasMore) {
        setInfiniteScrollHasMore(false);
      }
    } else {
      setTimeout(() => {
        setRecords(records + itemsPerScroll);
      }, 2000);
    }
  };

  const showItems = (
    filteredValues: (string | null | undefined)[],
    fieldName: string | undefined
  ) => {
    const items: (JSX.Element | null)[] = [];

    for (let index = 0; index < records; index++) {
      const filter = createBaseFilterObj[index];
      const filterListOptionsObj: FilterListOptionsProps = {
        filter,
        index,
        selectedIndices,
        handleChange,
        lockedOrgIds,
        fieldName,
        filterSortOrder,
      };
      if (!filter || !filter.value) {
        items.push(null);
      } else {
        items.push(
          renderFilterOptions(filterListOptionsObj, setColorForFieldsProp)
        );
      }
    }
    return items;
  };

  return (
    <Box data-testid="base-filter-infinite-scroll-container">
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={infiniteScrollHasMore}
        loader={
          <Skeleton
            data-testid="base-filter-infinite-scroll-skeleton"
            key={`base-filter-skeleton-row`}
          >
            <ListItem style={{ height: "22px", width: "212px" }} />
          </Skeleton>
        }
        useWindow={false}
      >
        {showItems(filteredValues, fieldName)}
      </InfiniteScroll>
    </Box>
  );
};
