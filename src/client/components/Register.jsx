import React from "react";
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Container,
  Grid,
} from "@mui/material";
import axios from "../axios";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const Register = ({ form, handlerChange, errorMessage, setErrorMessage }) => {
  const [status, setStatus] = React.useState("");

  const handlerSignup = async () => {
    try {
      await axios
        .post(
          "/auth/registration",
          { ...form },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setErrorMessage(res.data.message);
          setStatus(res.status);
        });
    } catch (e) {
      console.log(e);
      setStatus(e.response.status);
      setErrorMessage(e.response.data.message);
    }
  };
  function Result() {
    if (!status) return null;
    return status === 201 ? (
      <Box
        component="div"
        sx={{
          border: 1,
          borderColor: "success.light",
          color: "white",
          bgcolor: "success.light",
          width: "100%",
          pt: 1,
          pb: 1,
          borderRadius: 1,
        }}
      >
        {errorMessage}
      </Box>
    ) : (
      <Box
        component="div"
        sx={{
          border: 1,
          borderColor: "error.main",
          color: "white",
          bgcolor: "error.main",
          width: "100%",
          pt: 1,
          pb: 1,
          borderRadius: 1,
        }}
      >
        {errorMessage}
      </Box>
    );
  }
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={(e) => e.preventDefault()}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handlerChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handlerChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handlerChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlerChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handlerSignup}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Result />
      </Container>
    </ThemeProvider>
  );
};

export default Register;
