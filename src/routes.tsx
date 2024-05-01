import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { PageLayout } from "./layouts";
import { EnvironmentDetails } from "./features/environmentDetails";
import { EnvironmentCreate } from "./features/environmentCreate";

/**
 * Define URL routes for the single page app
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: ":namespaceName/new-environment",
        element: <EnvironmentCreate />
      },
      {
        path: ":namespaceName/:environmentName",
        element: <EnvironmentDetails />
      }
    ]
  }
]);
