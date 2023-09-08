import { isEmpty } from "@moodys/mdc-table.utils.object";
import { EsgUserType, UserInfoResponse } from "@models/api.types";

export const transformUserInfoResponse = (
  queryResponse: UserInfoResponse
): EsgUserType => {
  let result: EsgUserType = EsgUserType.ESG_NONE;

  if (isEmpty(queryResponse)) {
    return result;
  }
  result = queryResponse?.userInfo?.userType;
  return result;
};
