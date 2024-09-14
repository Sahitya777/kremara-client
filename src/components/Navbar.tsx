import { Avatar, Box, Text } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInModal from "./Modals/SignInModal";
import Image from "next/image";
import { userAtom } from "@/store/user.atoms";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
const Navbar = () => {
  const router = useRouter();
  const [profileDropdownSelected, setprofileDropdownSelected] = useState(false);
  const userData = useAtomValue<any>(userAtom);
  const [loading, setloading] = useState(true);
  const setUserData = useSetAtom(userAtom);
  //   {
  //     "name": "Sahitya Nijhawan",
  //     "email": "sahityanijhawan@gmail.com",
  //     "image": "https://lh3.googleusercontent.com/a/ACg8ocI69TCXC9_BxAFH_sKiTzRsFquvkapnMIas7SO-Y_drqvIHVw=s96-c"
  // }
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

        {userData && (
          <Box
            onClick={() => {
              setprofileDropdownSelected(!profileDropdownSelected);
            }}
          >
            <Box
              cursor="pointer"
              display="flex"
              justifyContent="center"
              border="1px solid grey"
              padding="6px"
              borderRadius="6px"
              gap="0.5rem"
            >
              <Image src={userData?.image} alt="" width={24} height={24} style={{borderRadius:'20px'}}/>
            </Box>
            {profileDropdownSelected && (
              <Box
                position="fixed"
                zIndex="200"
                right="4"
                gap="1rem"
                mt="0.65rem"
                width="200px"
                padding="16px"
                borderRadius="6px"
                display="flex"
                flexDirection="column"
                bg="grey"
              >
                <Box
                  cursor="pointer"
                  display="flex"
                  border="1px solid grey"
                  padding="6px"
                  borderRadius="6px"
                  gap="0.5rem"
                >
                  <Image src={userData?.image} alt="" width={24} height={24} style={{borderRadius:'20px'}}/>
                  <Text>
                    {userData?.firstName+userData?.lastName}
                  </Text>
                </Box>
                <Box
                  onClick={() => {
                    setprofileDropdownSelected(!profileDropdownSelected);
                    router.push("/settings");
                  }}
                >
                  Settings
                </Box>
                <Box
                  onClick={() => {
                    setprofileDropdownSelected(!profileDropdownSelected);
                    router.push(`profile/sahi`);
                  }}
                >
                  Public Profile
                </Box>
                <Box
                  onClick={() => {
                    localStorage.setItem("userLoginCode", "");
                    // setUserData(null)
                  }}
                >
                  Log out
                </Box>
              </Box>
            )}
          </Box>
        )}
        {!userData && <SignInModal buttonText="Sign In" />}
      </Box>
    </Box>
  );
};

export default Navbar;
