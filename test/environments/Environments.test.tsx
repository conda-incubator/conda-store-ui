import React from "react";
import { Provider } from "react-redux";
import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor
} from "@testing-library/react";
import { mockTheme } from "../testutils";
import { Environments } from "../../src/features/environments";
import { store } from "../../src/store";

jest.mock("../../src/features/namespaces/namespacesApiSlice", () => ({
  useLazyFetchNamespacesQuery: jest.fn(() => [
    () => ({
      data: {
        data: [
          {
            id: 1,
            name: "filesystem"
          }
        ]
      }
    })
  ]),
  useLazyFetchPrimaryNamespaceQuery: jest.fn(() => [
    () => ({
      data: {
        data: {
          primary_namespace: "admin",
          entity_permissions: {
            "filesystem/*": ["environment::read", "namespace::create"]
          }
        }
      }
    })
  ])
}));
jest.mock("../../src/features/environments/environmentsApiSlice", () => ({
  useLazyFetchEnvironmentsQuery: jest.fn(() => [
    () => ({
      data: {
        data: [
          {
            id: 1,
            namespace: { id: 1, name: "filesystem" },
            name: "python-flask-env-2",
            current_build_id: 1,
            current_build: 1,
            description: "test"
          }
        ]
      }
    })
  ])
}));

describe("<Environment />", () => {
  window.HTMLElement.prototype.scrollTo = jest.fn();
  const mockOnUpdateRefreshEnvironments = jest.fn();
  let component: RenderResult;

  beforeEach(async () => {
    component = render(
      mockTheme(
        <Provider store={store}>
          <Environments
            refreshEnvironments={true}
            onUpdateRefreshEnvironments={mockOnUpdateRefreshEnvironments}
          />
        </Provider>
      )
    );
    await waitFor(() => {
      expect(component.queryByText("filesystem")).toBeInTheDocument();
    });
  });

  it("should render namespaces and environments", async () => {
    await waitFor(() => {
      expect(component.queryByText("python-flask-env-2")).toBeInTheDocument();
    });
  });

  it("should call the refreshEnvironments method if env has already been updated.", async () => {
    expect(mockOnUpdateRefreshEnvironments).toHaveBeenCalledWith(false);
  });

  it("should use search input to filter the environment ", async () => {
    const searchInput = component.getByPlaceholderText(
      "Search for environment"
    );
    fireEvent.change(searchInput, { target: { value: "python-flask-env-2" } });

    await waitFor(() => {
      expect(screen.getByText("python-flask-env-2")).not.toBeNull();
    });
  });
});
