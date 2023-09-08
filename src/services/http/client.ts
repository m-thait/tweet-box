import { createAxiosInstance } from "@moodys/mdc-frontend.services.fetcher";
import { UrlGateway } from "@constants/api";

export const axiosClient = createAxiosInstance({
  baseURL: UrlGateway.BASE_API,
});
