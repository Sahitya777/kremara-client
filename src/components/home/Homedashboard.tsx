import { Contributor, Project } from "@/interfaces/interface";
import {
  Avatar,
  Box,
  Button,
  keyframes,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SignInModal from "../Modals/SignInModal";
import axios from "axios";
import { atom, useAtom } from "jotai";
import { userAtom } from "@/store/user.atoms";
const Homedashboard = () => {
  const projects: Project[] = [
    {
      name: "Starkfarm",
      logo: "https://bit.ly/dan-abramov",
      description:
        "STRKFarm is a decentralized yield aggregator built on Starknet. It aims to maximize returns for users by automatically reallocating assets across various DeFi protocols.",
    },
    {
      name: "Carmine Options",
      logo: "https://bit.ly/ryan-florence",
      description:
        "Carmine Options AMM, a platform for buying and selling European style options.",
    },
  ];
  const [contributors, setcontributors] = useState<Contributor[]>([]);
  const [recentActivity, setrecentActivity] = useState([]);
  const [infoCodeUpdated, setinfoCodeUpdated] = useState(false)
  const router = useRouter();
  const [userData,setUserData]=useAtom(userAtom)
  const scroll = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;
  const fadeInText = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
  const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
  
`;


  useEffect(()=>{
    try {
      const userLoginToken=localStorage.getItem('userLoginCode')
      if(userLoginToken && !userData){
        console.log('entry')
        const fetchUserData=async()=>{
          const res=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/user`,{
            headers: {
              "ngrok-skip-browser-warning": "69420",
              Authorization:`Bearer ${userLoginToken}`
            },
          })
          if(res?.data){
            setUserData(res?.data?.data)
          }
        }
        fetchUserData()
      }
    } catch (error) {
      console.log(error,"erro in fetching code")
    }
  },[infoCodeUpdated])

  useEffect(() => {
    try {
      if (router.query.code) {
        const fetchuserInfo=async()=>{
          const res=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/get-token?code=${router.query.code}`,          
            {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          })
          console.log(res?.data,"user ccheck sign in")
          if(res?.data){
            localStorage.setItem("userLoginCode", res?.data?.token as string);
            setinfoCodeUpdated(true)
          }
        }
        const userLoginToken=localStorage.getItem('userLoginCode')
        if(!userLoginToken &&!userData){
          fetchuserInfo()
        }
      }
    } catch (error) {
      console.log(error,"error in generating code")
    }
  }, [router.query.code]);

  return (
    <Box padding="4rem">
      <Box width="100%" display="flex" gap="2rem">
        <Box width="70%">
          <Box
            bgGradient="linear(to-r, teal.400, blue.500)"
            padding="1.5rem"
            borderRadius="10px"
            display="flex"
            alignItems="center"
            gap="1.5rem"
            justifyContent="center"
            boxShadow="lg"
          >
            <Image
              src="https://bit.ly/dan-abramov"
              alt="Logo"
              width={100}
              height={100}
            />

            <Text flex="1" fontSize="lg" color="white" fontWeight="bold">
              Discover Kremara: The Future of Web3 Creativity 🌟🚀 .Step into
              Kremara, the cutting-edge platform transforming the way creative
              talent and Web3 projects connect. Designed to ignite innovation,
              Kremara offers a unique environment where your creativity meets
              opportunity.
            </Text>

            <Button
              as={Link}
              href="/products"
              target="_blank"
              bg="yellow.400"
              color="black"
              _hover={{ bg: "yellow.300" }}
              _focus={{ outline: "none" }}
              boxShadow="md"
              fontWeight="bold"
              px="1.5rem"
              py="1rem"
              borderRadius="8px"
            >
              Click here
            </Button>
          </Box>
          {!userData && (
            <Box
              padding="2rem"
              mt="1rem"
              bg="purple.400"
              borderRadius="12px"
              textAlign="center"
              boxShadow="lg"
              // maxW="600px"
              animation={`${fadeIn} 1s ease-out`}
            >
              <Text fontSize="2xl" color="white" fontWeight="bold" mb="1rem">
                Ready to Join the Future of Web3?
              </Text>
              <Text fontSize="lg" color="white" mb="2rem">
                Sign up now to start your journey with Kremara and be part of
                the next big thing in creative innovation. 🚀
              </Text>
              <SignInModal
                buttonText="Sign Up Now"
                bg="yellow.400"
                color="black"
                _hover={{ bg: "yellow.300" }}
                _focus={{ outline: "none" }}
                px="1.5rem"
                py="1rem"
                borderRadius="8px"
                fontWeight="bold"
                size="lg"
              />
            </Box>
          )}
          <Box
            bg="grey"
            mt="1rem"
            height="350px" // Fixed height
            padding="2rem"
            borderRadius="6px"
            display="flex"
            flexDirection="column"
          >
            <Box>
              <Text fontSize="24px">Top trending projects</Text>
            </Box>
            <Box overflowY="auto" mt="1rem" flex="1">
              {projects.map((project: Project, index: number) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt="2rem"
                  key={index}
                >
                  <Box display="flex" gap="1rem">
                    <Avatar src={project.logo as string} />
                    <Box>
                      <Text>{project.name}</Text>
                      <Text>{project.description}</Text>
                    </Box>
                  </Box>
                  <Box>
                    <Button
                      cursor="pointer"
                      onClick={() => {
                        router.push(`/project/${project?.name}`);
                      }}
                    >
                      Click for project
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box width="30%">
          <Text fontSize="24px" mt="-0.5rem">
            Recent Acitivity
          </Text>
          <Box
            padding="1rem"
            bg="linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
            borderRadius="6px"
            fontSize="20px"
            overflow="hidden"
            maxH="250px"
            boxShadow="xl"
            position="relative"
          >
            <Box
              as="div"
              display="flex"
              cursor="pointer"
              gap="1rem"
              flexDirection="column"
              animation={`${scroll} 10s linear infinite`}
              // animationPlayState="running"  // Ensure animation runs by default
              _hover={{ animationPlayState: "paused" }} // Pause on hover
            >
              {/* Individual text items styled and animated */}
              <Text
                width="100%"
                bg="rgba(255, 255, 255, 0.1)"
                p="0.5rem"
                mb="0.5rem"
                borderRadius="4px"
                transition="background-color 0.3s"
                _hover={{
                  backgroundColor: "yellow.400", // Highlighted on hover
                  color: "black",
                }}
              >
                A new user has landed
              </Text>
              <Text
                width="100%"
                bg="rgba(255, 255, 255, 0.1)"
                p="0.5rem"
                mb="0.5rem"
                borderRadius="4px"
                transition="background-color 0.3s"
                _hover={{
                  backgroundColor: "yellow.400", // Highlighted on hover
                  color: "black",
                }}
              >
                This user contributed to the project
              </Text>
              <Text
                width="100%"
                bg="rgba(255, 255, 255, 0.1)"
                p="0.5rem"
                mb="0.5rem"
                borderRadius="4px"
                transition="background-color 0.3s"
                _hover={{
                  backgroundColor: "yellow.400", // Highlighted on hover
                  color: "black",
                }}
              >
                Someone got rewarded
              </Text>
              <Text
                width="100%"
                bg="rgba(255, 255, 255, 0.1)"
                p="0.5rem"
                mb="0.5rem"
                borderRadius="4px"
                transition="background-color 0.3s"
                _hover={{
                  backgroundColor: "yellow.400", // Highlighted on hover
                  color: "black",
                }}
              >
                A new project has landed
              </Text>
              <Text
                width="100%"
                bg="rgba(255, 255, 255, 0.1)"
                p="0.5rem"
                mb="0.5rem"
                borderRadius="4px"
                transition="background-color 0.3s"
                _hover={{
                  backgroundColor: "yellow.400", // Highlighted on hover
                  color: "black",
                }}
              >
                New tasks are available
              </Text>
              {/* Add more Text elements as needed */}
            </Box>
          </Box>
          <Text fontSize="24px" mt="1rem">
            Top Contributors
          </Text>
          <Box
            bg="grey"
            // mt="1rem"
            padding="1.5rem"
            borderRadius="6px"
            height="400px" // Same fixed height as the first box
            display="flex"
            flexDirection="column"
          >
            <Text>Top Contributors</Text>
            <Box height="100%" overflowY="auto" mt="1rem">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Contributor</Th>
                    <Th>Total Contributions</Th>
                    <Th>Rewards</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* Example table data */}
                  {Array(100)
                    .fill(0)
                    .map((_, index) => (
                      <Tr
                        key={index}
                        cursor="pointer"
                        _hover={{ background: "blue" }}
                        onClick={() => {
                          router.push(`/profile/${index + 1}`);
                        }}
                      >
                        <Td>Name {index + 1} </Td>
                        <Td>{index * 2}</Td>
                        <Td>{index + 2}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap="1rem" mt="3rem" width="100%">
        {/* First Box for Trending Projects */}

        {/* Second Box for Contributors with Scrollable Table */}
      </Box>
    </Box>
  );
};

export default Homedashboard;
