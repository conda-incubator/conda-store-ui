import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { EnvironmentsList } from "../../src/features/environments";
import { ENVIRONMENT, mockTheme } from "../testutils";
import { store } from "../../src/store";

describe("<EnvironmentsList />", () => {
  window.HTMLElement.prototype.scrollTo = jest.fn();

  it("should display namespaces and their environments", () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <EnvironmentsList
            environmentsList={[
              {
                ...ENVIRONMENT,
                namespace: {
                  id: 2,
                  name: "new-shared-env"
                }
              }
            ]}
            namespacesList={[
              {
                name: "default",
                id: 1
              },
              {
                name: "shared-env",
                id: 2
              }
            ]}
            hasMore={false}
            next={jest.fn()}
            search={""}
          ></EnvironmentsList>
        </Provider>
      )
    );

    expect(component.container).toHaveTextContent("default");
    expect(component.container).toHaveTextContent("python-flask-env-2");
  });
});
