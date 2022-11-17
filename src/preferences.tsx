import React from "react";

export interface IPreferences {
  apiUrl: string;
  authMethod: "cookie" | "token";
  authToken: string;
  loginUrl: string;
  appStyle: string;
}

export const prefDefault: Readonly<IPreferences> = {
  apiUrl: process.env.REACT_APP_API_URL ?? "http://localhost:5000/conda-store/",
  authMethod:
    (process.env.REACT_APP_AUTH_METHOD as IPreferences["authMethod"]) ??
    "cookie",
  authToken: process.env.REACT_APP_AUTH_TOKEN ?? "",
  loginUrl:
    process.env.REACT_APP_LOGIN_PAGE_URL ??
    "http://localhost:5000/conda-store/login?next",
  appStyle: process.env.REACT_APP_STYLE_TYPE ?? "grayscale"
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

  get appStyle() {
    return this._appStyle;
  }

  set(pref: IPreferences) {
    this._apiUrl = pref.apiUrl;
    this._authMethod = pref.authMethod;
    this._authToken = pref.authToken;
    this._loginUrl = pref.loginUrl;
    this._appStyle = pref.appStyle;
  }

  private _apiUrl: IPreferences["apiUrl"];
  private _authMethod: IPreferences["authMethod"];
  private _authToken: IPreferences["authToken"];
  private _loginUrl: IPreferences["loginUrl"];
  private _appStyle: IPreferences["appStyle"];
}

export const prefGlobal = new Preferences();
export const PrefContext = React.createContext<IPreferences>(prefDefault);
