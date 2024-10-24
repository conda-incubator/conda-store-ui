import React from "react";

export interface IPreferences {
  apiUrl: string;
  authMethod: "cookie" | "token";
  authToken: string;
  loginUrl: string;
  styleType: string;
  showAuthButton: boolean;
  logoutUrl: string;

  // routerType - Should the app use the browser's history API for routing, or
  // should app routes be handled internally in memory? This is needed for the
  // JupyterLab extension because when conda-store-ui is embedded in JupyterLab,
  // the URL routes in the browser address bar are for JupyterLab, not for
  // conda-store-ui.
  routerType: "browser" | "memory";

  // urlBasename - Defaults to "/" but can be changed if the app needs to be
  // mounted at a different URL path, such as "/conda-store"
  urlBasename: string;
}

let condaStoreConfig: any = {};
if (typeof window !== "undefined" && "condaStoreConfig" in window) {
  condaStoreConfig = window.condaStoreConfig;
}

export const prefDefault: Readonly<IPreferences> = {
  apiUrl:
    condaStoreConfig.REACT_APP_API_URL ??
    process.env.REACT_APP_API_URL ??
    "http://localhost:8080/conda-store/",

  authMethod:
    condaStoreConfig.REACT_APP_AUTH_METHOD ??
    process.env.REACT_APP_AUTH_METHOD ??
    "cookie",

  authToken:
    condaStoreConfig.REACT_APP_AUTH_TOKEN ??
    process.env.REACT_APP_AUTH_TOKEN ??
    "",

  loginUrl:
    condaStoreConfig.REACT_APP_LOGIN_PAGE_URL ??
    process.env.REACT_APP_LOGIN_PAGE_URL ??
    "http://localhost:8080/conda-store/login?next=",

  styleType:
    condaStoreConfig.REACT_APP_STYLE_TYPE ??
    process.env.REACT_APP_STYLE_TYPE ??
    "green-accent",

  showAuthButton: /true/i.test(
    condaStoreConfig.REACT_APP_SHOW_AUTH_BUTTON ??
      process.env.REACT_APP_SHOW_AUTH_BUTTON ??
      "true"
  ),

  logoutUrl:
    condaStoreConfig.REACT_APP_LOGOUT_PAGE_URL ??
    process.env.REACT_APP_LOGOUT_PAGE_URL ??
    "http://localhost:8080/conda-store/logout?next=/",

  routerType:
    condaStoreConfig.REACT_APP_ROUTER_TYPE ??
    process.env.REACT_APP_ROUTER_TYPE ??
    "browser",

  urlBasename:
    condaStoreConfig.REACT_APP_URL_BASENAME ??
    process.env.REACT_APP_URL_BASENAME ??
    "/"
};

export class Preferences implements IPreferences {
  constructor(pref: IPreferences = prefDefault) {
    this.set(pref);
  }

  get apiUrl() {
    return this._apiUrl;
  }

  get authMethod() {
    return this._authMethod;
  }

  get authToken() {
    return this._authToken;
  }

  get loginUrl() {
    return this._loginUrl;
  }

  get styleType() {
    return this._styleType;
  }

  get showAuthButton() {
    return this._showAuthButton;
  }

  get logoutUrl() {
    return this._logoutUrl;
  }

  get routerType() {
    return this._routerType;
  }

  get urlBasename() {
    return this._urlBasename;
  }

  set(pref: IPreferences) {
    this._apiUrl = pref.apiUrl;
    this._authMethod = pref.authMethod;
    this._authToken = pref.authToken;
    this._loginUrl = pref.loginUrl;
    this._styleType = pref.styleType;
    this._showAuthButton = pref.showAuthButton;
    this._logoutUrl = pref.logoutUrl;
    this._routerType = pref.routerType;
    this._urlBasename = pref.urlBasename;
  }

  private _apiUrl: IPreferences["apiUrl"];
  private _authMethod: IPreferences["authMethod"];
  private _authToken: IPreferences["authToken"];
  private _loginUrl: IPreferences["loginUrl"];
  private _styleType: IPreferences["styleType"];
  private _showAuthButton: IPreferences["showAuthButton"];
  private _logoutUrl: IPreferences["logoutUrl"];
  private _routerType: IPreferences["routerType"];
  private _urlBasename: IPreferences["urlBasename"];
}

export const prefGlobal = new Preferences();
export const PrefContext = React.createContext<IPreferences>(prefDefault);
