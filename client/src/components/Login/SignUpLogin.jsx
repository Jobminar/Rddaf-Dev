import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SocialAuth from "./SocialAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";
const CLIENT_ID =
  "967489170200-vj0aa4q12aovbb3jt69dkb32cm8b0m1f.apps.googleusercontent.com";

const SignUpLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };
  const propSubmission = () => {
    navigate("/proplist");
  };
  // Additional logic or actions to reload the page and clear the fields
  const reloadPageAndClearFields = () => {
    setEmail("");
    setPassword("");
    setError(null);
    window.location.reload();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/auth/${isLogin ? "login" : "signup"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      console.log("Response data:", data);

      if (response.ok) {
        sessionStorage.setItem("token", data.token);

        if (data.user && data.user.email) {
          alert(`Hi ${data.user.email}, Welcome!`);

          // Check if it's a signup and update the state to switch to the login screen
          if (!isLogin) {
            setIsLogin(true);
          }

          // Navigate to the home page
          navigate("/home");
        } else {
          reloadPageAndClearFields();
          console.error("User data not available in the response:", data);
        }
      } else {
        setError(data.error || "An unexpected error occurred");

        // Log additional error details for debugging
        console.error("Error details:", data);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleBackendData = (backendData) => {
    console.log("Received backendData:", backendData);
  };
  return (
    <Container component="main" maxWidth="xs">
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <SocialAuth onLogout={handleLogout} onBackendData={handleBackendData} />
      </GoogleOAuthProvider>
      <div>
        <Typography component="h1" variant="h5">
          {isLogin ? "Login" : "Create an Account"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <button onClick={propSubmission}>Property Form</button>
    </Container>
  );
};

export default SignUpLogin;
