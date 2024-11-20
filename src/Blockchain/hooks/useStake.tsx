
import { useAccount, useContractWrite } from "@starknet-react/core";
import { useState } from "react";
import { tokenAddressMap } from "../utils/addressesService";
import { stakingContractAddress } from "../stark-constants";
import { etherToWeiBN } from "../utils/utils";

const useStakeRequest = () => {
  const [token, settoken] = useState<any>("USDT");
  const [tokenAmount, settokenAmount] = useState<number>(500);
  const { address: owner } = useAccount();
  ////console.log("token stake request - ", token);

  const {
    data: dataStakeRequest,
    error: errorStakeRequest,
    reset: resetStakeRequest,
    write: writeStakeRequest,
    writeAsync: writeAsyncStakeRequest,
    isError: isErrorStakeRequest,
    isIdle: isIdleStakeRequest,
    isSuccess: isSuccessStakeRequest,
    status: statusStakeRequest,
  } = useContractWrite({
    calls: [
      {
        contractAddress: tokenAddressMap[token] || "",
        entrypoint: "approve",
        calldata: [
          stakingContractAddress,
          etherToWeiBN(tokenAmount, token).toString(),
          "0",
        ],
      },
      {
        contractAddress: stakingContractAddress,
        entrypoint: "stake_request",
        calldata: [
          tokenAddressMap[token] || "",
          etherToWeiBN(tokenAmount, token).toString(),
          "0",
          owner,
        ],
      },
      
    ],
  });

  return {
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
  };
};

export default useStakeRequest;
