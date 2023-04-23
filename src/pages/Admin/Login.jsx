import React, { useContext, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { ErrorAlert } from "../../components";
import useHttpRequest from "../../hooks/http-hook";
import AuthContext from "../../context/auth-context";

const Login = () => {
  const auth = useContext(AuthContext);

  const matches = useMediaQuery("(max-width:768px)");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_AUTH_URL}/login`,
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          username,
          password,
        })
      );

      auth.login(responseData.data.userId, responseData.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem 0",
          }}
        >
          <CircularProgress color="error" />
        </Box>
      ) : (
        <form
          onSubmit={loginHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "20rem",
            width: "20rem",
            margin: "5rem auto 0 auto",
          }}
        >
          <Typography variant="h4">Admin Login Page</Typography>
          <TextField
            sx={{ width: `${matches ? "20rem" : "30rem"}` }}
            variant="outlined"
            label="Username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => usernameChangeHandler(e)}
          />
          <TextField
            sx={{ width: `${matches ? "20rem" : "30rem"}` }}
            variant="outlined"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => passwordChangeHandler(e)}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "#AF1515" }}
          >
            Login
          </Button>
        </form>
      )}
      <ErrorAlert error={error} onClose={clearErrorHandler} />
    </Container>
  );
};

export default Login;
