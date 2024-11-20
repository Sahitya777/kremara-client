import {
  Box,
  Text,
  Input,
  Button,
  Avatar,
  Divider,
  Select,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateTaskModal from "../Modals/CreateTaskModal";
import { useStarknetkitConnectModal } from "starknetkit";
import { MYCONNECTORS } from "@/pages/_app";
import { useAccount, useConnect } from "@starknet-react/core";
import { Token, userType } from "@/interfaces/interface";
import useStakeRequest from "@/Blockchain/hooks/useStake";
import { toast } from "react-toastify";
import useBalanceOf from "@/Blockchain/hooks/useBalanceOf";
import {
  tokenAddressMap,
  tokenDecimalsMap,
} from "@/Blockchain/utils/addressesService";
import { parseAmount } from "@/Blockchain/utils/utils";
import { uint256 } from "starknet";
import ArrowUp from "@/assets/icons/ArrowUp";
import DropdownUp from "@/assets/icons/ArrowDown";
import BTCLogo from "@/assets/icons/btc";
import DAILogo from "@/assets/icons/dai";
import ETHLogo from "@/assets/icons/eth";
import STRKLogo from "@/assets/icons/strk";
import USDCLogo from "@/assets/icons/usdc";
import USDTLogo from "@/assets/icons/usdt";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "@/store/user.atoms";

const ProjectDashboard = () => {
  const router = useRouter();
  const [projectTasks, setprojectTasks] = useState([]);
  const [userType, setuserType] = useState<userType>("Moderator");
  const userData = useAtomValue<any>(userAtom);
  const [projectDetails, setprojectDetails] = useState<any>()
  const [tokenSelectedDropdown, settokenSelectedDropdown] =
    useState<Boolean>(false);
  const coins: Token[] = ["USDT", "USDC"];

  const {
    token,
    settoken,
    tokenAmount,
    settokenAmount,
    dataStakeRequest,
    errorStakeRequest,
    resetStakeRequest,
    writeStakeRequest,
    writeAsyncStakeRequest,
    isErrorStakeRequest,
    isIdleStakeRequest,
    isSuccessStakeRequest,
    statusStakeRequest,
  } = useStakeRequest();

  const handleTransaction = async () => {
    try {
      const res = await writeAsyncStakeRequest();
      console.log(res, "res");
    } catch (error) {
      toast.error("Transaction Declined", {
        position: "bottom-right",
        autoClose: false,
      });
      console.log(error, "err in transaction");
    }
  };

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
  const { starknetkitConnectModal: starknetkitConnectModal1 } =
    useStarknetkitConnectModal({
      modalMode: "canAsk",
      modalTheme: "dark",
      connectors: MYCONNECTORS,
    });
  interface assetB {
    USDT: any;
    USDC: any;
    BTC: any;
    ETH: any;
    DAI: any;
  }
  const walletBalances: assetB | any = {
    USDT: useBalanceOf(tokenAddressMap["USDT"]),
    USDC: useBalanceOf(tokenAddressMap["USDC"]),
  };
  const [walletBalance, setwalletBalance] = useState(
    walletBalances[token]?.statusBalanceOf === "success"
      ? parseAmount(
          String(
            uint256.uint256ToBN(walletBalances[token]?.dataBalanceOf?.balance)
          ),
          tokenDecimalsMap[token]
        )
      : 0
  );
  useEffect(() => {
    setwalletBalance(
      walletBalances[token]?.statusBalanceOf === "success"
        ? parseAmount(
            String(
              uint256.uint256ToBN(walletBalances[token]?.dataBalanceOf?.balance)
            ),
            tokenDecimalsMap[token]
          )
        : 0
    );
    ////console.log("supply modal status wallet balance",walletBalances[coin?.name]?.statusBalanceOf)
  }, [walletBalances[token]?.statusBalanceOf,token]);
  const { address, connector } = useAccount();
  const { connect, connectors } = useConnect();
  const connectWallet = async () => {
    try {
      const result = await starknetkitConnectModal1();

      connect({ connector: result.connector });
    } catch (error) {
      console.warn("connectWallet error", error);
      try {
        const result = await starknetkitConnectModal1();
        connect({ connector: result.connector });
      } catch (error) {
        console.error("connectWallet error", error);
        alert("Error connecting wallet");
      }
    }
  };

  useEffect(()=>{
    try {
      const fetchProjectDetails=async()=>{

      }
      fetchProjectDetails() 
    } catch (error) {
      console.log(error,'err in fetching details for project')
    }
  },[])

  return (
    <Box display="flex" padding="32px" gap="2rem" width="100%">
      <Box bg="grey" padding="3rem" borderRadius="6px" width="15%">
        <Text isTruncated>Left dashboard</Text>
        {projectTasks.length>0 && (userType=='Moderator' || userType==='Owner')&& <Box mt="0.5rem">
          <CreateTaskModal buttonText="Create Task" />
        </Box>}
      </Box>
      <Box display="flex" flexDirection="column" gap="1rem" width="60%">
        <Box>
          <Text fontSize="28px">{router.query.index}</Text>
        </Box>
        <Box bg="grey" padding="2rem" borderRadius="6px">
          <Box display="flex" gap="2rem">
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
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
        {projectTasks.map((projectTask, index) => (
          <Box
            bg="grey"
            padding="2rem"
            borderRadius="6px"
            cursor="pointer"
            key={index}
            onClick={() => {
              router.push(`/task/id1`);
            }}
          >
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
        ))}
        {projectTasks.length === 0 && (
          <Box bg="grey" padding="2rem" borderRadius="6px" minH="300px">
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
                    {!address && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        gap="1rem"
                      >
                        <Text>
                          For creating tasks you need to stake $500 worth of any
                          given token for security reasons
                        </Text>
                        <Button
                          onClick={() => {
                            connectWallet();
                          }}
                        >
                          Connect Wallet
                        </Button>
                      </Box>
                    )}
                    {address && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap="1rem"
                        justifyContent="center"
                      >
                        <Text>
                          For creating tasks you need to stake $500 worth of any
                          given token for security reasons
                        </Text>
                        <Text>{address}</Text>
                        <Box display="flex" flexDirection="column">
                          <Box display="flex" justifyContent="space-between">
                            <Text>Stake Token</Text>
                            <Text>
                              Balance: {walletBalance} {token}
                            </Text>
                          </Box>
                          <Box
                            display="flex"
                            border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                            justifyContent="space-between"
                            py="2"
                            pl="3"
                            pr="3"
                            mb="1rem"
                            mt="0.3rem"
                            borderRadius="md"
                            className="navbar"
                            cursor="pointer"
                          >
                            <Select value={token} onChange={(e)=>{
                              settoken(e.target.value)
                            }}>
                              {coins.map((coin, index) => (
                                <option key={index}>{coin}</option>
                              ))}
                            </Select>
                          </Box>
                        </Box>
                        <Button
                          onClick={() => {
                            handleTransaction();
                          }}
                          isDisabled={walletBalance<500}
                        >
                          Stake Amount
                        </Button>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box bg="grey" borderRadius="6px" width="20%" padding="2rem" minH="500px">
        <Box display="flex">
          <Text isTruncated>Project Details</Text>
        </Box>
        <Box mt="1rem">
          <Text>Moderator</Text>
          <Box display="flex" mt="0.5rem" gap="0.5rem" alignItems="center">
            <Avatar size="sm" />
            <Text>name</Text>
          </Box>
        </Box>
        <Box mt="1rem">
          <Text>Contributors</Text>
          <Box display="flex" mt="0.5rem" gap="0.5rem" alignItems="center">
            <Avatar size="sm" />
            <Text>name</Text>
          </Box>
        </Box>
        <Box mt="1rem">
          <Text>Languages</Text>
          <Box display="flex" mt="0.5rem" gap="0.5rem" alignItems="center">
            <Text>Typescript, Cairo, Next js</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDashboard;
