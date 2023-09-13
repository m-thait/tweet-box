import React, { useMemo, useState, useEffect } from "react";
import { Table as UiTable } from "@moodys/mdc-table.table";
import { ColumnMenuTab, GetRowIdParams } from "ag-grid-community";
import { getValueByDotSyntax } from "@moodys/mdc-table.utils.string";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { ErrorPage } from "@moodys/mdc-frontend.widgets.error-page";
import { HttpErrorStatusCode } from "@moodys/mdc-toolbox.api.status-codes";
import { SplitWrapper } from "@moodys/mdc-frontend.services.split";
import { TopBar as NewTopBar } from "@components/NewTopBar/TopBar";
import { TableRowsLoader } from "@components/SkeletonLoader/TableLoader";
import { TopBar } from "@components/Table/components/TopBar";
import { ColumnHeaderRenderer } from "@components/Table/renderers";
import { useGetColumnDefs } from "@components/Table/Table.hooks";
import { InfoDrawer } from "@components/InfoDrawer";
import { ESG_TOP_BAR_FLAG } from "@services/splitIO/splitIO.flags";
import {
  getPagination,
  getUserResponse,
  getUserType,
  useAppSelector,
} from "@services/redux";
import { UrlGateway, UrlPath } from "@constants/api";
import { EsgUserType } from "@models/api.types";
import { sidebar } from "./utils";
import { useTableEvents } from "./Table.events";
import { excelExportParams } from "./Table.constants";
import { FooterBody } from "./components/FooterBody";

// practice
import { TweetBox, Tweet } from "./TweetBox";

/* eslint-disable complexity */
export const Table = () => {

  const [tweets, setTweets] = useState<Tweet[]>([]);

  const pagination = useAppSelector(getPagination);
  const { columnDefs } = useGetColumnDefs();
  const {
    gridApi,
    exportClickHandler,
    onExportClick,
    getContextMenuItems,
    onFirstDataRendered,
    onFilterChanged,
    onFetchSuccess,
    onSortChanged,
    onToolPanelVisibleChanged,
    onPaginationPropChange,
    topPinnedRow,
    onFetchFailure,
    fetchError,
    onPaginationChanged,
    onColumnVisible,
    onColumnGroupOpened,
    onFilterOpened,
    onColumnMoved,
  } = useTableEvents();
  const theme = useTheme();
  const mediumScreens = useMediaQuery(theme.breakpoints.up("sm"));

  const icons = useMemo(() => {
    return {
      columnsMenu: `<div class="columnsMenu"><span class="tooltip-text">Edit Columns</span></div>`,
      filterMenu: `<div class="filterMenu"><span class="tooltip-text">Filters</span></div>`,
    };
  }, []);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      filterParams: {
        showTooltips: true,
      },
      sortable: true,
      width: 112,
      resizable: true,
      menuTabs: ["filterMenuTab", "generalMenuTab"] as ColumnMenuTab[],
    }),
    []
  );

  const components = useMemo(() => {
    return {
      agColumnHeader: ColumnHeaderRenderer,
    };
  }, []);

  const loadingOverlayComponent = useMemo<unknown>(() => {
    return TableRowsLoader;
  }, []);

  const getRowId = (params: GetRowIdParams) =>
    getValueByDotSyntax(
      params.data,
      ESGColumnFields.ORG_ID.fieldName
    ) as string;

  const { page, rowsPerPage } = pagination;

  const isUserTypeFetchFailed = useAppSelector(getUserResponse).isError;
  const userType = useAppSelector(getUserType);

  if (isUserTypeFetchFailed) {
    return <ErrorPage statusCode={HttpErrorStatusCode.INTERNAL_SERVER_ERROR} />;
  }

  if (fetchError) {
    const {
      response: { status },
    } = fetchError;
    return (
      <ErrorPage
        statusCode={status ?? HttpErrorStatusCode.INTERNAL_SERVER_ERROR}
      />
    );
  }
  
  const messages: any[] = [{
    message: "Hello"
  }, {
    message: "How are you"
  }, {
    message: "Hi"
  }, {
    message: "Bye"
  }, {
    message: "OMG"
  }
]

  // fetch all the titles of sample data and store in array
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          if (response.ok) {
            const data = await response.json();
            const titles: Tweet[] = data.map((tweet: { title: string; }) => (
                                    {message: tweet.title}));
            setTweets(titles)
          } else {
            console.error("Failed to fetch data");
          }
        } catch (error) {
          console.error("Error fetching data")
        }
      };

      fetchData();
    }, []);


  return userType != EsgUserType.ESG_NONE ? (
    <>
      {/* {mediumScreens && (
        <SplitWrapper
          splitName={ESG_TOP_BAR_FLAG}
          treatmentElementMap={{
            on: (
              <NewTopBar gridApi={gridApi} onExportClick={exportClickHandler} />
            ),
            off: (
              <TopBar gridApi={gridApi} onExportClick={exportClickHandler} />
            ),
          }}
        />
      )} */}

      {/* TODO: Render a tweet message that looks exactly like the one provided */}
      {/* {TweetBox(messages[0])} */}

      {/* TODO: Iterate through array to render different tweet messages */}
      {/* {messages.map(({message}) => (
                  <TweetBox
                    message={message}
                  />
                ))} */}

      {/* TODO: Use sample API to fetch data and use its title for tweet */}
      {tweets.map((tweet) => (
        <TweetBox
        tweet={tweet}
        />
      ))}
        
      {/* {
        <UiTable
          icons={icons}
          getRowId={getRowId}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          components={components}
          footerBodyComponent={<FooterBody />}
          loadingOverlayComponent={loadingOverlayComponent}
          // state change events
          onFirstDataRendered={onFirstDataRendered}
          onFilterChanged={onFilterChanged}
          onFilterOpened={onFilterOpened}
          onSortChanged={onSortChanged}
          onToolPanelVisibleChanged={onToolPanelVisibleChanged}
          sideBar={sidebar}
          tooltipShowDelay={1000}
          tooltipHideDelay={200000}
          tooltipMouseTrack={true}
          enableCellTextSelection
          suppressCsvExport
          onExportClickFunction={onExportClick}
          excelExportParams={excelExportParams}
          getContextMenuItems={getContextMenuItems}
          onColumnVisible={onColumnVisible}
          onColumnMoved={onColumnMoved}
          onColumnGroupOpened={onColumnGroupOpened}
          // server side
          serverSideParams={{
            baseURL: UrlGateway.BASE_API,
            path: UrlPath.ESG_INFO,
            goToPageOnLoad: page,
            onSuccessCallback: onFetchSuccess,
            onFailureCallback: onFetchFailure,
          }}
          maxConcurrentDatasourceRequests={1}
          // pagination
          rowsPerPageOptions={[100, 200, 500, 1000]}
          rowsPerPageOnLoad={rowsPerPage ?? 100}
          onPaginationPropChange={onPaginationPropChange}
          onPaginationChanged={onPaginationChanged}
          pinnedTopRowData={topPinnedRow}
        />
      } */}
      <InfoDrawer />
    </>
  ) : null;
};
