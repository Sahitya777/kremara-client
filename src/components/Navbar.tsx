import { Box, Text } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInModal from "./Modals/SignInModal";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding="16px 32px"
      bg="brown"
    >
      <Box display="flex" gap="2rem">
        <Box
          cursor="pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          Logo
        </Box>
        <Box display="flex" gap="1rem" cursor="pointer" fontSize="20px">
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
        {session && (
          <Box
            // onClick={() => {
            //   router.push("/profile/id");
            // }}
            cursor="pointer"
            display="flex"
            justifyContent="center"
            border="1px solid grey"
            padding="6px"
            borderRadius="6px"
            gap="0.5rem"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/77379621?v=4"
              alt="image"
              width={24}
              height={24}
              style={{ borderRadius: "60px" }}
            />
            <Text
              onClick={() => {
                signOut();
              }}
            >
              {session?.user?.name}
            </Text>
          </Box>
        )}
        {!session && <SignInModal buttonText="Sign In" />}
      </Box>
    </Box>
  );
};

export default Navbar;
