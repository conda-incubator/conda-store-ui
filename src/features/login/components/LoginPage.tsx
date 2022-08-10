import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { LoginForm } from "./LoginForm";
import { useLoginMutation } from "src/features/login/loginApiSlice";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [error, setError] = useState({
    message: undefined,
    visible: false
  });

  const loginUser = async (user: any) => {
    try {
      const { username, password } = user;
      await login({ username, password }).unwrap();
    } catch (err) {
      if (err.status === 403) {
        setError({
          message: err.data?.message,
          visible: true
        });
        return;
      }
      // Even if the login process is successful, it will response with 303 status code.
      navigate("/");
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

          {error.visible && (
            <Alert
              severity="error"
              sx={{
                marginBottom: "20px"
              }}
            >
              {error.message}
            </Alert>
          )}
          <LoginForm onSubmitForm={loginUser} />
        </Grid>
      </Grid>
    </Container>
  );
};
