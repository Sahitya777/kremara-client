import { Box, Text } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInModal from "./Modals/SignInModal";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [profileDropdownSelected, setprofileDropdownSelected] = useState(false)
  console.log(session,'ss')
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
          <Box
            onClick={() => {
              router.push("/rewards");
            }}
            cursor="pointer"
          >
            Rewards
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap="1rem" cursor="pointer">
        <Box fontSize="20px">Notification</Box>
        {session && (
          <Box             
          onClick={()=>{
            setprofileDropdownSelected(!profileDropdownSelected)
          }}>
            <Box
              cursor="pointer"
              display="flex"
              justifyContent="center"
              border="1px solid grey"
              padding="6px"
              borderRadius="6px"
              gap="0.5rem"
            >
              <Image
                src={session?.user?.image as string}
                alt="image"
                width={24}
                height={24}
                style={{ borderRadius: "60px" }}
              />
              <Text
              >
                {session?.user?.name}
              </Text>
            </Box>
            {profileDropdownSelected &&<Box position="fixed" right="4" gap="1rem" mt="0.65rem" width="200px" padding="16px" borderRadius="6px" display="flex" flexDirection="column" bg="grey">
              <Box
              cursor="pointer"
              display="flex"
              border="1px solid grey"
              padding="6px"
              borderRadius="6px"
              gap="0.5rem"
            >
              <Image
                src={session?.user?.image as string}
                alt="image"
                width={24}
                height={24}
                style={{ borderRadius: "60px" }}
              />
              <Text
              >
                {session?.user?.name}
              </Text>
            </Box>
              <Box onClick={()=>{
                setprofileDropdownSelected(!profileDropdownSelected)
                router.push('/settings')
              }}>
                Settings
              </Box>
              <Box onClick={()=>{
                setprofileDropdownSelected(!profileDropdownSelected)
                router.push(`profile/sahi`)
              }}>
                Public Profile
              </Box>
              <Box onClick={()=>{
                signOut()
              }}>
                Log out
              </Box>
            </Box>}
          </Box>
        )}
        {!session && <SignInModal buttonText="Sign In" />}
      </Box>
    </Box>
  );
};

export default Navbar;
