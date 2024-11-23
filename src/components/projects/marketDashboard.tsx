import { Project } from "@/interfaces/interface";
import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SignInModal from "../Modals/SignInModal";
import { useAtom } from "jotai";
import { userAtom } from "@/store/user.atoms";

const MarketDashboard = () => {
  const [projects, setprojects] = useState<Project[]>([
    {
      name:'Starkfarm',
      logo:'',
      description:'STRKFarm is a decentralized yield aggregator built on Starknet. It aims to maximize returns for users by automatically reallocating assets across various DeFi protocols.'
    },
    {
      name:'Carmine Options',
      logo:'',
      description:'Carmine Options AMM, a platform for buying and selling European style options.'
    },
  ]);
  const router=useRouter()
  const [userData] = useAtom(userAtom);
  const { data: session } = useSession();

  useEffect(()=>{
    const fetchProjects=async()=>{
      
    }
    fetchProjects()
  },[])

  return (
    <Box display="flex" padding="32px" gap="2rem" width="100%">
      <Box bg="grey" display="flex" flexDirection="column"padding="2rem" borderRadius="6px" width="20%" minHeight="500px">
        <Box width="100%" display="flex" gap="0.5rem" justifyContent="center" alignItems="center" bg="beige" padding="8px" borderRadius="6px">
            {session && <Text>
                Create project
            </Text>}
            {!userData && <SignInModal variant="ghost" buttonText="Sign in to create project"/>}
            {userData &&<Button onClick={()=>{
                router.push(`/register`)
            }}>
                Register
            </Button>}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap="1rem" width="80%">
        {projects.map((project:Project,index:number) => (
          <Box key={index} bg="grey" padding="2rem" borderRadius="6px" cursor="pointer" onClick={()=>{
            router.push(`/project/${project.name}`)
          }}>
            <Box display="flex" gap="2rem">
            <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                    />
              <Box>
              <Box display="flex" gap="1rem">
                  {project?.name}
                </Box>
                <Box display="flex" gap="1rem">
                  {project?.description}
                </Box>
                <Box mt="1rem">
                Tags and other info
              </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MarketDashboard;
