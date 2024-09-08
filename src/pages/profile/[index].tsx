import Navbar from "@/components/Navbar";
import PublicProfile from "@/components/publicProfile/publicProfile";
import { Box } from "@chakra-ui/react";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Index = () => {
  // const [user, setUser] = useState<any>([]);
  // const [profile, setProfile] = useState<any>([]);
  const [first, setfirst] = useState('hhh')

  const handleLoginSuccess = async (credentialResponse: {
    credential: any;
  }) => {
    try {
      const token = credentialResponse.credential;

      // Fetch user profile info using the token
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = await response.json();
      console.log(userData); // Contains email, name, and other info
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <Box>
      <Navbar />
      <PublicProfile/>
    </Box>
  );
};

export default Index;
