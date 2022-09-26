import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { LoginForm, LoginAlert } from "./index";
import { useLoginMutation } from "src/features/auth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const [error, setError] = useState({
    message: "",
    visible: false
  });

  const loginUser = async (user: any) => {
    const { username, password } = user;

    if (!username || !password) {
      setError({
        message: "Complete all requiered fields",
        visible: true
      });
      return;
    }

    try {
      await login({ username, password }).unwrap();
    } catch (err) {
      // Even if the login process is successful, it will response with 303 status code
      if (err.status === "PARSING_ERROR") {
        navigate("/");
        return;
      }
      // Invalid authentication credentials
      if (err.status === 403) {
        setError({
          message: err.data?.message,
          visible: true
        });
        return;
      } else {
        setError({
          message: "An error occurred while processing your request",
          visible: true
        });
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Grid item sm={12} md={10}>
          <Typography
            variant="h2"
            component="h2"
            className="typography"
            sx={{ marginBottom: "20px", color: "#4D4D4D", textAlign: "center" }}
          >
            Please sign in
          </Typography>
          <LoginAlert
            severity="error"
            visible={error.visible}
            message={error.message}
          />
          <LoginForm onSubmitForm={loginUser} />
        </Grid>
      </Grid>
    </Container>
  );
};
