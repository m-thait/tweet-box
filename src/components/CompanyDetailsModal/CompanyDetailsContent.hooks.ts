import { useState, useEffect, useRef } from "react";
import { ErrorWithMeta } from "@moodys/mdc-toolbox.errors.error-with-meta";
import { logger } from "@moodys/mdc-frontend.services.logger";
import { fetchOrgInfo } from "@services/api";
import { OrgInfoOpenApi } from "@models/api.types";

export const useGetOrgInfo = (orgId: string) => {
  const [errorMessage, setErrorMessage] = useState("");
  const orgInfoLoaded = useRef(false);
  const [orgInfo, setOrgInfo] = useState<OrgInfoOpenApi>();

  useEffect(() => {
    (async () => {
      try {
        if (!orgInfoLoaded.current) {
          orgInfoLoaded.current = true;
          const orgInfoResponse = await fetchOrgInfo(orgId);
          setOrgInfo(orgInfoResponse);
        }
      } catch (error: unknown) {
        setErrorMessage(`OrgInfo failed to load for orgId: ${orgId}`);
        throw new ErrorWithMeta((error as Error).message);
      }
    })().catch((error) => {
      logger.error({ message: error });
    });
  }, [orgId, orgInfo]);

  return {
    orgInfo,
    errorMessage,
    orgInfoLoaded: orgInfoLoaded.current,
  };
};
