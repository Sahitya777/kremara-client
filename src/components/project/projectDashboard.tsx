import {
  Box,
  Text,
  Input,
  Button,
  Avatar,
  Divider,
  Select,
  AvatarGroup,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateTaskModal from "../Modals/CreateTaskModal";
import { useStarknetkitConnectModal } from "starknetkit";
import { MYCONNECTORS } from "@/pages/_app";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { Contributor, Token, userType } from "@/interfaces/interface";
import useStakeRequest from "@/Blockchain/hooks/useStake";
import { toast } from "react-toastify";
import useBalanceOf from "@/Blockchain/hooks/useBalanceOf";
import {
  tokenAddressMap,
  tokenDecimalsMap,
} from "@/Blockchain/utils/addressesService";
import { parseAmount } from "@/Blockchain/utils/utils";
import { uint256 } from "starknet";
import githubIcon from '../../assets/github-logo.png'
import BTCLogo from "@/assets/icons/btc";
import DAILogo from "@/assets/icons/dai";
import ETHLogo from "@/assets/icons/eth";
import STRKLogo from "@/assets/icons/strk";
import USDCLogo from "@/assets/icons/usdc";
import USDTLogo from "@/assets/icons/usdt";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "@/store/user.atoms";
import StakeModal from "../Modals/StakeModal";

const ProjectDashboard = () => {
  const router = useRouter();
  const [projectTasks, setprojectTasks] = useState([]);
  const [userType, setuserType] = useState<userType>("Moderator");
  const userData = useAtomValue<any>(userAtom);
  const [projectDetails, setprojectDetails] = useState<any>({
    moderators:["Hello","Kingshit"]
  });
  const [projectContributors, setprojectContributors] = useState<Contributor[]>([])
  const [tokenSelectedDropdown, settokenSelectedDropdown] =
    useState<Boolean>(false);


  const getCoin = (CoinName: string) => {
    switch (CoinName) {
      case "BTC":
        return <BTCLogo height={"16px"} width={"16px"} />;
      case "USDC":
        return <USDCLogo height={"16px"} width={"16px"} />;
      case "USDT":
        return <USDTLogo height={"16px"} width={"16px"} />;
      case "ETH":
        return <ETHLogo height={"16px"} width={"16px"} />;
      case "DAI":
        return <DAILogo height={"16px"} width={"16px"} />;
      case "STRK":
        return <STRKLogo height={"16px"} width={"16px"} />;
      default:
        break;
    }
  };

  const [projectAmountStaked, setprojectAmountStaked] =
    useState<Boolean>(false);

  useEffect(() => {
    try {
      const fetchProjectDetails = async () => {};
      fetchProjectDetails();
    } catch (error) {
      console.log(error, "err in fetching details for project");
    }
  }, []);

  return (
<Box display="flex" padding="32px" gap="2rem" width="100%" position="relative">
  {/* Left Dashboard */}
  <Box
    bg="grey"
    padding="3rem"
    mt="4rem"
    borderRadius="6px"
    width="15%"
    minH="500px"
    position="fixed"
    zIndex={1} // Ensures it's above the background
  >
    <Text isTruncated>Left dashboard</Text>
    {projectTasks.length > 0 &&
      (userType == "Moderator" || userType === "Owner") && (
        <Box mt="0.5rem">
          <CreateTaskModal buttonText="Create Task" />
        </Box>
      )}
  </Box>

  {/* Center Content (Scrollable) */}
  <Box
    display="flex"
    flexDirection="column"
    gap="1rem"
    width="60%"
    overflowY="auto" // Makes the content scrollable
    marginLeft="18%" // Adjust according to the width of your left dashboard
    marginRight="16%" // Adjust according to the width of your right dashboard
    mt="2rem"
    paddingTop="32px" // Ensure there's space for the fixed left and right sections
  >
    <Box>
      <Text fontSize="28px">{router.query.index}</Text>
    </Box>
    <Box bg="grey" padding="2rem" borderRadius="6px">
      <Box display="flex" gap="1rem">
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Box>
          <Box fontSize="18px" fontWeight="700">{router.query.index}</Box>
          <Box display="flex" gap="1rem">
            <Box>2-3 line description</Box>
          </Box>
        </Box>
      </Box>
      <Box mt="1rem" bg="grey" ml="4rem">
        {projectDetails?.toolsAndTech && (
          <Box>
            <Text>Languages</Text>
            <Box display="flex" mt="0.5rem" gap="0.5rem" alignItems="center">
              {projectDetails?.toolsAndTech.split(",").map((toolsAndTech: string, index: number) => (
                <Text key={index}>
                  {toolsAndTech}
                </Text>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>

    {/* Tasks */}
    {projectTasks.length === 0 && (
          <Box bg="grey" padding="2rem" borderRadius="6px" minH="250px">
            <Text fontSize="24px">Tasks</Text>
            <Text>One liner for dessc</Text>
            {userType === "Normal" ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt="3rem"
              >
                No active tasks found
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt="1rem"
              >
                {projectAmountStaked ? (
                  <CreateTaskModal buttonText="Create Task" />
                ) : (
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    gap="1rem"
                  >
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap="1rem"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Text>
                          For creating tasks you need to stake $500 worth of any
                          given token for security reasons
                        </Text>
                        <StakeModal buttonText="Stake Amount"/>
                      </Box>
                    
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}
    {projectTasks.map((projectTask, index) => (
      <Box
        bg="grey"
        padding="2rem"
        borderRadius="6px"
        cursor="pointer"
        key={index}
        onClick={() => {
          router.push(`/task/${index+1}`);
        }}
      >
        <Box display="flex" gap="1rem">
          <Box height="100%">
            <Image
              src={githubIcon}
              alt=""
              height={30}
              width={30}
              style={{ borderRadius: '200px' }}
            />
          </Box>
          <Box>
            <Box>
              <Text>
                Task Title
              </Text>
            </Box>
            <Box display="flex" gap="1rem">
              1 liner for tasks
            </Box>
          </Box>
        </Box>
        <Box height="1px" borderBottom="1px solid black" mt="1rem"></Box>
      </Box>
    ))}
  </Box>

  {/* Right Dashboard */}
  <Box
    bg="grey"
    borderRadius="6px"
    width="20%"
    padding="2rem"
    minH="500px"
    position="fixed"
    top="32px" // Adjust to your desired spacing
    right="32px" // Adjust to your desired spacing
    zIndex={1} // Ensures it's above the background
    mt="4rem"
  >
    <Box display="flex">
      <Text isTruncated fontSize="18px" fontWeight="700">Project Details</Text>
    </Box>
    {projectDetails?.moderators.length > 0 && (
      <Box mt="1rem">
        <Text fontWeight="500">Moderators</Text>
        <Box display="flex" mt="0.5rem" gap="0.5rem" alignItems="center">
          <AvatarGroup size="sm" max={3}>
            {projectDetails?.moderators.map((moderator: any, index: number) => (
              <Avatar key={index} name={moderator.name} cursor="pointer" src={moderator.profileIcon} />
            ))}
          </AvatarGroup>
        </Box>
      </Box>
    )}
    {projectContributors.length > 0 && (
      <Box mt="1rem">
        <Text>Contributors</Text>
        <Box display="flex" mt="0.5rem" gap="0.5rem" alignItems="center">
          <AvatarGroup size="sm" max={3}>
            {projectContributors.map((contriButor: Contributor, index: number) => (
              <Avatar key={index} name={contriButor.name} cursor="pointer" src={contriButor.profileIcon} />
            ))}
          </AvatarGroup>
        </Box>
      </Box>
    )}
    {projectDetails?.toolsAndTech && (
      <Box mt="1rem">
        <Text>Languages</Text>
        <Box display="flex" mt="0.5rem" gap="0.5rem" alignItems="center">
          {projectDetails?.toolsAndTech.split(",").map((toolsAndTech: string, index: number) => (
            <Text key={index}>
              {toolsAndTech}
            </Text>
          ))}
        </Box>
      </Box>
    )}
  </Box>
</Box>

  );
};

export default ProjectDashboard;
