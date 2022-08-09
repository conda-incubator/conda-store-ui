import React from "react";
import { Container } from "@mui/system";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";

export const LoginPage = () => {
  const onSubmit = () => console.log("test");
  return (
    <form>
      <Container maxWidth="xs">
        <Grid container spacing={1}>
          <Grid item md={12}>
            <TextField variant="outlined" label="Username" fullWidth />
          </Grid>
          <Grid item md={12}>
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              component={RouterLink}
              to="/"
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};
