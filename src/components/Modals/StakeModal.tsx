import React, { useEffect, useState } from "react";
import Image from "next/image";
import googleLogo from "../../assets/googleLogo.png";
import githubLogo from "../../assets/github-logo.png";
import twitterLogo from "../../assets/twitterLogo.png";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  ModalBody,
  ModalCloseButton,
  Card,
  Text,
  Checkbox,
  Tooltip,
  Box,
  NumberInput,
  NumberInputField,
  Portal,
  Select,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store/user.atoms";
import useBalanceOf from "@/Blockchain/hooks/useBalanceOf";
import {
  tokenAddressMap,
  tokenDecimalsMap,
} from "@/Blockchain/utils/addressesService";
import { parseAmount } from "@/Blockchain/utils/utils";
import { MYCONNECTORS } from "@/pages/_app";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { uint256 } from "starknet";
import { useStarknetkitConnectModal } from "starknetkit";
import useStakeRequest from "@/Blockchain/hooks/useStake";
import { Token } from "@/interfaces/interface";
import { toast } from "react-toastify";
import STRKLogo from "@/assets/icons/strk";

const StakeModal = ({ buttonText, ...restProps }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputAmount, setinputAmount] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [buttonId, setButtonId] = useState(0);
  const fetchCall = async () => {
    const res = await axios.get(
      "https://a4c9-103-215-237-73.ngrok-free.app/auth/login"
    );
  };
  const router = useRouter();
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
  }, [walletBalances[token]?.statusBalanceOf, token]);
  const { address, connector,account } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
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
  const coins: Token[] = ["USDT", "USDC"];
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

  return (
    <div>
      <Button onClick={onOpen} {...restProps}>
        {buttonText}
      </Button>
      <Portal>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{ width: "700px", height: "120px" }}
          isCentered
        >
          <ModalOverlay bg="rgba(244, 242, 255, 0.5);" />
          <ModalContent
            color="white"
            borderRadius="md"
            maxW="462px"
            zIndex={1}
            mt="8rem"
            className="modal-content"
          >
            <ModalHeader
              mt="1rem"
              fontSize="14px"
              fontWeight="600"
              fontStyle="normal"
              lineHeight="20px"
              color="black"
            >
              Stake
            </ModalHeader>
            <ModalCloseButton mt="1rem" mr="1rem" />
            <ModalBody>
              <Box
                color="black"
                display="flex"
                flexDirection="column"
                gap="1rem"
                mb="1rem"
              >
                <Box>
                  <Text>
                    For Safety reason as the project is onboarding for making
                    tasks we would require you to stake 500$ of any given token
                    with us, which you can withdraw anytime that you like
                  </Text>
                </Box>
                {
                    address &&<Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap="0.2rem">
                            <STRKLogo width={16} height={16}/>
                            <Text>
                            {account?.address.substring(
                            0,
                            3
                            )}...{account?.address.substring(
                            account.address.length - 9,
                            account.address.length
                            )}
                            </Text>
                        </Box>
                        <Button height="30px" onClick={()=>{
                            disconnectAsync()
                        }}>
                            Disconnect Wallet
                        </Button>
                    </Box>
                }
                {!address &&
                  <Button
                    onClick={() => {
                      connectWallet();
                    }}
                  >
                    Connect Wallet
                  </Button>
                }
                {address &&<Box display="flex" flexDirection="column">
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
                    <Select
                      value={token}
                      onChange={(e) => {
                        settoken(e.target.value);
                      }}
                    >
                      {coins.map((coin, index) => (
                        <option key={index}>{coin}</option>
                      ))}
                    </Select>
                  </Box>
                </Box>}
                {address &&<Button
                  onClick={() => {
                    handleTransaction();
                  }}
                  isDisabled={walletBalance < 500}
                >
                  Stake Amount
                </Button>}
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Portal>
    </div>
  );
};
export default StakeModal;
