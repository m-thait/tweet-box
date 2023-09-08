import { config as dotenvConfig } from "dotenv";
import {
  getConfig,
  getRemotePromiseLoader,
  ModuleFederationOptions,
  WebpackConfigOverrideOptions,
} from "@moodys/mdc-config.frontend.webpack";
import { name as repoName, dependencies } from "./package.json";
import { ProxyConfigMap } from "webpack-dev-server";

const defaultDevUrl = "https://dev.moodys.com";
const dotenvVariables = dotenvConfig({ path: `./.env` }).parsed;
const apiTargetUrl = dotenvVariables?.REACT_APP_API_GATEWAY ?? defaultDevUrl;
const enableProxy = dotenvVariables?.REACT_APP_API_GATEWAY;

const configurationOverrides: WebpackConfigOverrideOptions = {
  entry:
    process.env.NODE_ENV === "development" &&
    process.env.DEV_FEDERATION !== "true"
      ? "./src/local/bootstrap.tsx"
      : "./src/bootstrap.tsx",
  output: {
    uniqueName: repoName,
  },
  resolve: {
    fallback: {
      path: false,
    },
  },
  ...(enableProxy && {
    devServer: {
      proxy: [
        {
          context: [
            // Endpoints you want to call dev
            "/screener/api/user-info",
            "/screener/api/score-definition",
            "/web/esg-api",
            "/market-segment/api",
            "/taxonomy/api",
          ],
          target: `${defaultDevUrl}`,
          secure: false,
          changeOrigin: true,
        },
        {
          context: [
            // Endpoints you want to call local api
            "/screener/api/esg-facets",
            "/screener/api/esg-info",
            "/screener/api/esg-list-median",
            "/screener/api/lt-rating-sparklines",
            "/screener/api/export",
            "/screener/api/esg-comments",
            "/screener/api/org-info",
          ],
          target: `${apiTargetUrl}`,
          pathRewrite: { "^/screener/api": "" },
          secure: false,
          changeOrigin: true,
        },
      ],
    },
  }),
};

const federationConfig: ModuleFederationOptions = {
  path: "mfe/screener",
  uniqueName: repoName,
  pluginConfig: {
    name: "MdcScreener",
    exposes: {
      "./Screener": "./src/app/App.tsx",
    },
    remotes: {
      MdcShell: getRemotePromiseLoader({
        name: "MdcShell",
        path: "",
        staticStructure: true,
      }),
    },
    shared: {
      ...dependencies,
    },
  },
};

const config = getConfig({
  baseDirectory: __dirname,
  configurationOverrides,
  dotenvVariables,
  federationConfig,
});

// need to remove **/api/** as it will take precedent over other proxies
enableProxy &&
  delete (config?.devServer?.proxy as ProxyConfigMap)["/**/api/**"];

export default config;
