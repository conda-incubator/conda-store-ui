import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { LoginPage } from "../src/features/auth";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUsedNavigate
}));

jest.mock("../src/features/auth/authApiSlice", () => ({
  useLoginMutation: () => [
    () => ({
      unwrap: () =>
        new Promise((resolve, reject) => {
          const newError = {
            ...new Error(),
            status: "PARSING_ERROR"
          };
          reject(newError);
        })
    }),
    {}
  ]
}));

describe("<LoginPage />", () => {
  it("should render component", () => {
    const component = render(<LoginPage />);

    expect(component.container).toHaveTextContent("Please sign in");
  });

  it("should show an error alert if fields are not filled", () => {
    const component = render(<LoginPage />);
    const inputUsername = component.getByLabelText("Username");
    const inputPassword = component.getByLabelText("Password");

    fireEvent.change(inputUsername, { target: { value: "" } });
    fireEvent.change(inputPassword, { target: { value: "" } });

    const loginButton = component.getByText("Sign In");
    fireEvent.click(loginButton);

    expect(component.container).toHaveTextContent(
      "Complete all requiered fields"
    );
  });

  it("should redirect if login is successful", async () => {
    const component = render(<LoginPage />);
    const loginButton = component.getByText("Sign In");

    await fireEvent.click(loginButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
