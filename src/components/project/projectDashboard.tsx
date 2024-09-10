import { Box, Text, Input, Button, Avatar, Divider } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CreateTaskModal from "../Modals/CreateTaskModal";
import { useStarknetkitConnectModal } from "starknetkit";
import { MYCONNECTORS } from "@/pages/_app";
import { useAccount, useConnect } from "@starknet-react/core";

const ProjectDashboard = () => {
  const router = useRouter();
  const [projectTasks, setprojectTasks] = useState([0]);
  const [userType, setuserType] = useState("Moderator")
  const [projectAmountStaked, setprojectAmountStaked] = useState<Boolean>(true)
  const { starknetkitConnectModal: starknetkitConnectModal1 } =
  useStarknetkitConnectModal({
    modalMode: 'canAsk',
    modalTheme: 'dark',
    connectors: MYCONNECTORS,
  });
  const { address, connector } = useAccount();
  const { connect, connectors } = useConnect();
  const connectWallet = async () => {
    try {
      const result = await starknetkitConnectModal1();

      connect({ connector: result.connector });
    } catch (error) {
      console.warn('connectWallet error', error);
      try {
        const result = await starknetkitConnectModal1();
        connect({ connector: result.connector });
      } catch (error) {
        console.error('connectWallet error', error);
        alert('Error connecting wallet');
      }
    }
  };
  return (
    <Box display="flex" padding="32px" gap="2rem" width="100%">
      <Box bg="grey" padding="3rem" borderRadius="6px" width="15%">
        <Text isTruncated>
          Left dashboard
        </Text>
      </Box>
      <Box display="flex" flexDirection="column" gap="1rem" width="60%">
        <Box>
          <Text fontSize="28px">{router.query.index}</Text>
        </Box>
        <Box bg="grey" padding="2rem" borderRadius="6px">
          <Box display="flex" gap="2rem">
          <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                      />
            <Box>
              <Box>{router.query.index}</Box>
              <Box display="flex" gap="1rem">
                tags
              </Box>
            </Box>
          </Box>
          <Box mt="1rem" bg="grey">
            <Box>2-3 line description</Box>
          </Box>
        </Box>
        {
          projectTasks.map((projectTask,index)=>(
            <Box bg="grey" padding="2rem" borderRadius="6px" cursor="pointer" key={index} onClick={()=>{
              router.push(`/task/id1`)
            }}>
              <Box display="flex" gap="2rem">
                <Box height="100%">
                  Logo for tasks
                  {/* <Image src="" alt=""/> */}
                </Box>
                <Box>
                  <Box>title</Box>
                  <Box display="flex" gap="1rem">
                    1 liner for tasks
                  </Box>
                </Box>
              </Box>
              <Box height="1px" borderBottom="1px solid black" mt="1rem"></Box>
            </Box>
          ))
        }
        {projectTasks.length===0 &&
        <Box bg="grey" padding="2rem" borderRadius="6px" minH="300px">
          <Text fontSize="24px">
            Tasks
          </Text>
            <Text>
              One liner for dessc
            </Text>
            {userType==='normal'?
            <Box display="flex" justifyContent="center" alignItems="center" mt="3rem">
              No active tasks found
            </Box>:
            <Box display="flex" justifyContent="center" alignItems="center" mt="3rem">
              {projectAmountStaked?
              <CreateTaskModal buttonText="Create Task"/>:
              <Box display="flex" flexDirection="column" justifyContent="center" gap="1rem">
                <Text>
                  {address}
                </Text>
                {!address &&<Button onClick={()=>{
                  connectWallet()
                }}>
                  Connect Wallet
                </Button>}
                {address &&<Button>
                  Stake Amount
                </Button>}
              </Box>
              }
            </Box>
            
            }
        </Box>

        }
      </Box>
      <Box bg="grey" borderRadius="6px"  width="20%" padding="2rem" >
        <Box display="flex" >
          <Text  isTruncated>
            Project Details
          </Text>
        </Box>
        <Box mt="1rem">
          <Text>
            Moderator
          </Text>
          <Box display="flex" mt="0.5rem" gap="0.5rem"  alignItems="center">
            <Avatar size="sm"/>
            <Text>
              name
            </Text>
          </Box>
        </Box>
        <Box mt="1rem">
          <Text>
            Contributors
          </Text>
          <Box display="flex" mt="0.5rem" gap="0.5rem"  alignItems="center">
            <Avatar size="sm"/>
            <Text>
              name
            </Text>
          </Box>
        </Box>
        <Box mt="1rem">
          <Text>
            Languages
          </Text>
          <Box display="flex" mt="0.5rem" gap="0.5rem"  alignItems="center">
            <Text>
              Typescript, Cairo, Next js
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDashboard;
