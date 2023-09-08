import { useState, useEffect, useRef } from "react";
import { ErrorWithMeta } from "@moodys/mdc-toolbox.errors.error-with-meta";
import { logger } from "@moodys/mdc-frontend.services.logger";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import {
  ColumnFieldNames,
  EsgViewComment,
} from "@moodys/mdc-table.schemas.screener";
import { fetchEsgComments } from "@services/api";

export const useGetEsgComments = (
  orgId: string,
  columns: ColumnFieldNames[]
) => {
  const [esgComments, setEsgComments] = useState<null | EsgViewComment>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const commentsLoaded = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        if (!commentsLoaded.current) {
          commentsLoaded.current = true;
          const data = await fetchEsgComments(orgId, columns);
          if (!isEmpty(data[0])) {
            setEsgComments(data[0]);
          } else {
            setErrorMessage(`No comments found for orgId: ${orgId}`);
          }
        }
      } catch (error: unknown) {
        setErrorMessage(`Comments failed to load for orgId: ${orgId}`);
        throw new ErrorWithMeta((error as Error).message);
      }
    })().catch((error) => {
      logger.error({ message: error });
    });
  }, [orgId, columns]);

  return {
    esgComments,
    errorMessage,
    commentsLoaded: commentsLoaded.current,
  };
};
