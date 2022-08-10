import React from "react";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { LoginForm } from "./Form";

export const LoginPage = () => {
  const loginUser = (user: any) => {
    // call the login API hook
    console.log(user);
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
          <Alert
            severity="error"
            sx={{
              marginBottom: "20px"
            }}
          >
            Invalid authentication credentials
          </Alert>
          <LoginForm onSubmitForm={loginUser} />
        </Grid>
      </Grid>
    </Container>
  );
};
