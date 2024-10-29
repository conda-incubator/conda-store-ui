import React from "react";
import { useHref } from "react-router-dom";

import { PageLayout } from "./layouts";
import { EnvironmentDetails } from "./features/environmentDetails";
import { EnvironmentCreate } from "./features/environmentCreate";
import { NoEnvironmentSelected } from "./components/NoEnvironmentSelected";
import { NotFound } from "./components/NotFound";

/**
 * Define URL routes for the single page app
 */

const HardRedirectNotFound = () => {
  // useHref takes into account React Router basename option. So if basename is
  // set to "/conda-store", the hook will return "/conda-store/not-found"
  const url = useHref("/not-found");
  window.location.replace(url);
  return null;
};

export const routes = [
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <NoEnvironmentSelected />
      },
      {
        path: ":namespaceName/new-environment",
        element: <EnvironmentCreate />
      },
      {
        path: ":namespaceName/:environmentName",
        element: <EnvironmentDetails />
      },
      {
        path: "not-found",
        element: <NotFound />
      }
    ]
  },
  // If no route matches, send the user to a route on the server that will
  // return a proper 404 HTTP status code.
  {
    path: "*",
    element: <HardRedirectNotFound />
  }
];
