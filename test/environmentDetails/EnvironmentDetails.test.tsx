import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { ENVIRONMENTS, mockTheme } from "../testutils";
import {
  EnvironmentDetails,
  EnvironmentDetailsModes,
  modeChanged
} from "../../src/features/environmentDetails";
import { store } from "../../src/store";
import { environmentOpened } from "../../src/features/tabs";

jest.mock("../../src/features/artifacts/ArtifactsApiSlice", () => ({
  useLazyGetArtifactsQuery: jest.fn(() => [
    () => ({
      data: {
        build_artifacts: [
          {
            id: 1,
            artifact_type: "LOGS",
            key: "logs/1"
          }
        ]
      }
    })
  ])
}));
jest.mock("../../src/features/environments/environmentsApiSlice");
jest.mock("../../src/features/metadata/metadataApiSlice");

describe("<EnvironmentDetails />", () => {
  window.HTMLElement.prototype.scrollTo = jest.fn();

  it("should render initial environment information", async () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <EnvironmentDetails />
        </Provider>
      ),
      { wrapper: BrowserRouter }
    );

    act(() => {
      store.dispatch(
        environmentOpened({
          environment: ENVIRONMENTS[0]
        })
      );
    });

    await waitFor(() => {
      expect(component.queryByText(ENVIRONMENTS[0].name)).toBeInTheDocument();
    });
  });

  it("should edit environment details", async () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <EnvironmentDetails />
        </Provider>
      ),
      { wrapper: BrowserRouter }
    );

    act(() => {
      store.dispatch(
        environmentOpened({
          environment: ENVIRONMENTS[0]
        })
      );
      store.dispatch(modeChanged(EnvironmentDetailsModes.EDIT));
    });

    const descriptionInput = component.getByText(ENVIRONMENTS[0].description);
    fireEvent.change(descriptionInput, {
      target: { value: "New description" }
    });

    await waitFor(() => {
      expect(component.queryByText("New description")).toBeInTheDocument();
    });
  });
});
