import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { LoginPage } from "../src/features/login/components";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate
}));

jest.mock("../src/features/login/loginApiSlice", () => ({
  useLoginMutation: jest.fn(() => [
    {
      login: jest.fn
    }
  ])
}));

describe("<EnvMetadata />", () => {
  it("should render component", () => {
    const component = render(<LoginPage />);

    expect(component.container).toHaveTextContent("Please sign in");
  });

  it("should redirect if login is successful", () => {
    const component = render(<LoginPage />);
    const loginButton = component.getByText("Sign In");
    fireEvent.click(loginButton);

    expect(mockUseNavigate).toHaveBeenCalled();
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
});
