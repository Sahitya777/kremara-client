import { Box } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding="16px 32px"
      bg="brown"
    >
      <Box display="flex" gap="2rem">
        <Box cursor="pointer">Logo</Box>
        <Box display="flex" gap="1rem" cursor="pointer">
          <Box
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </Box>
          <Box
            onClick={() => {
              router.push("/projects");
            }}
            cursor="pointer"
          >
            Projects
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap="1rem" cursor="pointer">
        <Box>Notification</Box>
        <Box
          onClick={() => {
            router.push("/profile");
          }}
          cursor="pointer"
        >
          Sign in
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
