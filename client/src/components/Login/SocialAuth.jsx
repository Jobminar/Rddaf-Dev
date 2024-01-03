import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  GoogleLogin,
  useGoogleOneTapLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

function SocialAuth({ onLogout, onBackendData }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [backendDataState, setBackendDataState] = useState(null);
  const navigate = useNavigate();

  // Google on successful login
  const googlelogin = useGoogleOneTapLogin({
    onSuccess: async (tokenResponse) => {
      const idToken = tokenResponse.id_token;
      setUser(tokenResponse);
      await fetchUserProfile(idToken);

      // Set idToken as 'Token' in sessionStorage
      sessionStorage.setItem("Token", idToken);

      // Send user details to the backend
      sendUserToBackend(tokenResponse);
    },
  });

  const handleLogoutSuccess = () => {
    // Logout and clear session
    googlelogin().then(() => {
      sessionStorage.removeItem("Token");
      setUser(null);
      setProfile(null);
      // Call the onLogout prop function to handle navigation
      onLogout();
      onBackendData(backendDataState);
    });
  };

  const fetchUserProfile = async (idToken) => {
    console.log("fetchuser is working");
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const sendUserToBackend = async (tokenResponse) => {
    const credentialResponseDecoded = jwtDecode(tokenResponse.credential);

    const backendData = {
      profileImage: credentialResponseDecoded.picture || "N/A",
      username: credentialResponseDecoded.name || "N/A",
      email: credentialResponseDecoded.email,
      password: "password",
      fullname: credentialResponseDecoded.name || "N/A",
      title: "N/A",
      language: "N/A",
      googleId: credentialResponseDecoded.email || "N/A",
    };

    try {
      // Send data to the backend
      const response = await axios.post(
        "http://localhost:3000/auth/signup", // Update with your backend endpoint
        backendData
      );
      if (response.status === 200) {
        onBackendData(backendData);
        // Log the success message
        console.log("User data sent to the backend:", response.data);
        // Navigate to /home
        navigate("/home");
      } else {
        console.error("Backend returned an unexpected response:", response);
      }
    } catch (error) {
      console.error("Error sending user data to the backend:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="967489170200-vj0aa4q12aovbb3jt69dkb32cm8b0m1f.apps.googleusercontent.com">
      <div>
        {user ? (
          <>
            <p>Welcome, {profile?.name}!</p>
            <button onClick={handleLogoutSuccess}>Logout</button>
          </>
        ) : (
          <GoogleLogin
            clientId="967489170200-vj0aa4q12aovbb3jt69dkb32cm8b0m1f.apps.googleusercontent.com"
            buttonText="Login with Google"
            onClick={() => googlelogin()}
            onSuccess={() => {}}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default SocialAuth;
