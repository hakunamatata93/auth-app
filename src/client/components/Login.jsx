import React from "react";
import { AuthContext } from "../context/AuthContext.js";
import { Button, CssBaseline, TextField, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "../axios.js";

const Login = ({ form, handlerChange, errorMessage, setErrorMessage }) => {
  const [status, setStatus] = React.useState("");
  const { login } = React.useContext(AuthContext);

  const Error = () => {
    if (!status) return null;
    if (status && status !== 200)
      return (
        <Box
          component="div"
          sx={{
            border: 1,
            borderColor: "error.main",
            color: "white",
            bgcolor: "error.main",
            width: "50%",
            pt: 1,
            pb: 1,
            borderRadius: 1,
          }}
        >
          {errorMessage}
        </Box>
      );
  };

  const handlerLogin = async () => {
    try {
      await axios
        .post(
          "/auth/login",
          { ...form },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          login(res.data.token, res.data.userId);
          setStatus(res.status);
        });
    } catch (e) {
      console.log(e);
      setStatus(e.response.status);
      setErrorMessage(e.response.data.message);
    }
  };
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
            onSubmit={(e) => e.preventDefault()}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              sx={{ height: "50%" }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={handlerChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handlerChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handlerLogin}
            >
              Sign In
            </Button>
          </Box>
          <Error />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
