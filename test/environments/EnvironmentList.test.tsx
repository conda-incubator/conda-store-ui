import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { EnvironmentsList } from "../../src/features/environments";
import { ENVIRONMENT, ENVIRONMENTS, mockTheme } from "../testutils";
import { store } from "../../src/store";

describe("<EnvironmentsList />", () => {
  window.HTMLElement.prototype.scrollTo = jest.fn();

  it("should display primary namespace", () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <EnvironmentsList
            environmentsList={[
              {
                ...ENVIRONMENT,
                namespace: { id: 2, name: "python-flask-env" }
              }
            ]}
            namespacesList={[
              {
                id: 2,
                name: "python-flask-env",
                isPrimary: true
              }
            ]}
            hasMore={false}
            next={jest.fn()}
            search={""}
          ></EnvironmentsList>
        </Provider>
      )
    );

    expect(component.container).toHaveTextContent("python-flask-env");
  });

  it("should display shared environments", () => {
    const component = render(
      mockTheme(
        <Provider store={store}>
          <EnvironmentsList
            environmentsList={ENVIRONMENTS}
            namespacesList={[
              {
                name: "default",
                id: 1
              }
            ]}
            hasMore={false}
            next={jest.fn()}
            search={""}
          ></EnvironmentsList>
        </Provider>
      )
    );

    expect(component.container).toHaveTextContent("Shared Environments");
    expect(component.container).toHaveTextContent("default");
  });
});
