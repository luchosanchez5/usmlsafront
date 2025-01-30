import React from "react";
import { BiLogoGoogle } from "react-icons/bi"; // Import Google icon
import { LoginSocialGoogle } from "reactjs-social-login"; // Import Google login component

const GoogleLogin = ({title}) => {
  // Handle successful login
  const handleGoogleLogin = (data) => {
    const { code } = data; // Extract authorization code

    // Optional: Perform further actions, such as sending the code to your backend for authentication
    fetch("https://your-backend-endpoint.com/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Backend response:", result);
        // Perform any additional actions here (e.g., storing user info, redirecting)
      })
      .catch((error) => {
        console.error("Error sending Google login code to backend:", error);
      });
  };

  // Handle login error
  const handleError = (error) => {
    console.error("Google Login Error:", error);
    // Optionally, show an error message to the user
  };

  return (
    <LoginSocialGoogle
      className="google-login"
      isOnlyGetToken
      client_id={process.env.REACT_APP_GOOGLE_CLIENT} // Ensure the environment variable is set
      scope="openid profile email" // Define the required scopes
      access_type="offline" // For refresh token access
      onResolve={({ provider, data }) => handleGoogleLogin(data)} // Handle success
      onReject={handleError} // Handle error
    >
      <button className="google-login-button">
        <BiLogoGoogle size={24} /> {/* Google icon */}
      {title}
      </button>
    </LoginSocialGoogle>
  );
};

export default GoogleLogin;
