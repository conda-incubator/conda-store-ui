import React from "react";

export interface IPreferences {
  apiUrl?: string
  authMethod?: string
  loginUrl?: string
  authToken?: string
}

export const prefDefault = {
  apiUrl: process.env.REACT_APP_API_URL ?? "http://localhost:5000/conda-store/",
  authMethod: process.env.REACT_APP_AUTH_METHOD ?? "cookie",
  loginUrl: process.env.REACT_APP_LOGIN_PAGE_URL ?? "http://localhost:5000/conda-store/login?next",
  authToken: process.env.REACT_APP_AUTH_TOKEN ?? "",
}

export const PreferencesContext = React.createContext<IPreferences>(prefDefault);
