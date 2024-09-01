import Navbar from '@/components/Navbar'
import { Box } from '@chakra-ui/react'
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const index = () => {
  const [ user, setUser ] = useState<any>([]);
  const [ profile, setProfile ] = useState<any>([]);

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
          if (user) {
              axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err,'err'));
          }
      },[user]);
  const logOut = () => {
    googleLogout();
    setProfile(null);
};

  const handleLoginSuccess = async (credentialResponse: { credential: any }) => {
    try {
      const token = credentialResponse.credential;

      // Fetch user profile info using the token
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response,"res")

      const userData = await response.json();
      console.log(userData); // Contains email, name, and other info
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <Box>
      <Navbar/>
      <Box onClick={()=>{
        login()
      }}>
        log
      </Box>
    </Box>
  )
}

export default index;
