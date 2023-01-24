import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import MainPage from "../MainPage/MainPage.jsx";
import { ButtonGroup, Button, Container } from "@mui/material";
import Login from "../../components/Login.jsx";
import Register from "../../components/Register.jsx";
import "./AuthPage.scss";

const AuthPage = () => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const handlerChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Container maxWidth="320px" sx={{ pt: 3 }}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          padding={150}
        >
          <Button>
            <Link to="/login">Log in</Link>
          </Button>
          <Button>
            <Link to="/register">Register</Link>
          </Button>
        </ButtonGroup>
      </Container>

      <Routes>
        <Route
          path="/login"
          element={
            <Login
              form={form}
              handlerChange={handlerChange}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              form={form}
              handlerChange={handlerChange}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          }
        />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </>
  );
};

export default AuthPage;
