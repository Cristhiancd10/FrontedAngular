import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const msalConfig: Configuration = {
  auth: {
    clientId: '1ed7b31b-762e-4c97-ae65-2f9a08204f1f',
    authority: 'https://login.microsoftonline.com/e1aedac1-aea3-4c36-a713-c4e644631cc2',
    redirectUri: 'https://app-web-p.web.app/list'
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false
    }
  }
}
export const protectedResources = {
  todoListApi: {
    endpoint: "https://app-web-p.web.app/list",
    scopes: ["api://1ed7b31b-762e-4c97-ae65-2f9a08204f1f/user.Read"],
  },
}
export const loginRequest = {
  scopes: []
};
