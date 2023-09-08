import { useSearchParams } from "react-router-dom";

export const useQueryParam = (
  param: string,
  skipToLower = false
): string | undefined => {
  const [searchParams] = useSearchParams();
  const value = searchParams.get(param);
  const formattedValue = skipToLower ? (value as string) : value?.toLowerCase();
  return value ? formattedValue : undefined;
};
