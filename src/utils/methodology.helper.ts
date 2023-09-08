import { getMethodologyDocumentLink } from "@services/api";
import { logError } from "@utils/error.utils";

export const openMethodologyDocument = async (type: string): Promise<void> => {
  try {
    const documentId = methodologyDocuments[type];
    const { url: signedUrl } = await getMethodologyDocumentLink(documentId);
    window.open(signedUrl, "_blank");
  } catch (error) {
    logError(error, "getMethodologyDocumentLink");
  }
};

export const methodologyDocuments: Record<string, string> = Object.freeze({
  cis_ips: "PBC_1288235",
  environmental: "PBC_1327857",
  social: "PBC_1327856",
  autos: "PBC_1190452",
  refining: "PBC_1226417",
  utilities: "PBC_1240567",
  airlines: "PBC_1251442",
  exploration_production: "PBC_1254209",
  integrated: "PBC_1269680",
  steel: "PBC_1310171",
});
