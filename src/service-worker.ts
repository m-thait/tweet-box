// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-expressions,no-restricted-globals
self.__WB_MANIFEST;

export enum Enum {
  SCRIPT = "script",
  SERVICE_WORKER = "serviceWorker",
  SW_FILE_NAME = "service-worker.js",
  INSTALLED = "installed",
  LOAD = "load",
  CONTENT_TYPE = "content-type",
  JAVASCRIPT = "javascript",
}

export enum Messages {
  APP_SERVED_CACHE_FIRST = "This web app is being served cache-first by a service worker.",
  NO_INTERNET_CONNECTION = "No internet connection found. App is running offline mode",
  CONTENT_IS_CACHED = "Content is cached for offline use.",
  NEW_CONTENT_IS_AVAILABLE = "New content is available and will be used when all tabs for this page are closed.",
}

type Config = {
  onSuccess?: (reg: ServiceWorkerRegistration) => void;
  onUpdate?: (reg: ServiceWorkerRegistration) => void;
};

function isLocalhost(): boolean {
  return window.location.host.split(":")[0] === "localhost";
}

function registerValidSW(swURL: string, config?: Config) {
  navigator.serviceWorker.register(swURL, { scope: "." }).then((reg) => {
    reg.onupdatefound = () => {
      const installingWorker = reg.installing;
      if (installingWorker == null) {
        return;
      }
      // eslint-disable-next-line complexity
      installingWorker.onstatechange = () => {
        if (installingWorker.state === Enum.INSTALLED) {
          if (navigator.serviceWorker.controller) {
            // eslint-disable-next-line no-console
            console.log(Messages.NEW_CONTENT_IS_AVAILABLE);
            if (config && config.onUpdate) {
              config.onUpdate(reg);
            }
          } else {
            // eslint-disable-next-line no-console
            console.log(Messages.CONTENT_IS_CACHED);
            if (config && config.onSuccess) {
              config.onSuccess(reg);
            }
          }
        }
      };
    };
  });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  fetch(swUrl, {
    headers: { "Service-Worker": Enum.SCRIPT },
  })
    .then((res) => {
      const contentType = res.headers.get(Enum.CONTENT_TYPE);
      if (
        res.status === 404 ||
        (contentType !== null && contentType.indexOf(Enum.JAVASCRIPT) === -1)
      ) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log(Messages.NO_INTERNET_CONNECTION);
    });
}

export default function registerServiceWorker(config?: Config) {
  if (Enum.SERVICE_WORKER in navigator) {
    window.addEventListener(Enum.LOAD, () => {
      const protocol = isLocalhost() ? "http" : "https";
      const serviceWorkerUrl = `${protocol}://${window.location.host}/${Enum.SW_FILE_NAME}`;
      if (isLocalhost()) {
        checkValidServiceWorker(serviceWorkerUrl, config);
        navigator.serviceWorker.ready.then(() => {
          // eslint-disable-next-line no-console
          console.log(Messages.APP_SERVED_CACHE_FIRST);
        });
      } else {
        registerValidSW(serviceWorkerUrl, config);
      }
    });
  }
}
