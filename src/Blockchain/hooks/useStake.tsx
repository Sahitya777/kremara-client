
// import { useAccount, useContractWrite } from "@starknet-react/core";
// import { useState } from "react";

// const useStakeRequest = () => {
//   const [rToken, setRToken] = useState<RToken>("rBTC");
//   const [rTokenAmount, setRTokenAmount] = useState<number>(0);
//   const { address: owner } = useAccount();
//   ////console.log("rToken stake request - ", rToken);

//   const {
//     data: dataStakeRequest,
//     error: errorStakeRequest,
//     reset: resetStakeRequest,
//     write: writeStakeRequest,
//     writeAsync: writeAsyncStakeRequest,
//     isError: isErrorStakeRequest,
//     isIdle: isIdleStakeRequest,
//     isSuccess: isSuccessStakeRequest,
//     status: statusStakeRequest,
//   } = useContractWrite({
//     calls: [
//       {
//         contractAddress: tokenAddressMap[rToken] || "",
//         entrypoint: "approve",
//         calldata: [
//           diamondAddress,
//           etherToWeiBN(rTokenAmount, rToken).toString(),
//           "0",
//         ],
//       },
//       {
//         contractAddress: diamondAddress,
//         entrypoint: "stake_request",
//         calldata: [
//           tokenAddressMap[rToken] || "",
//           etherToWeiBN(rTokenAmount, rToken).toString(),
//           "0",
//           owner,
//         ],
//       },
      
//     ],
//   });

//   return {
//     rToken,
//     setRToken,
//     rTokenAmount,
//     setRTokenAmount,
//     dataStakeRequest,
//     errorStakeRequest,
//     resetStakeRequest,
//     writeStakeRequest,
//     writeAsyncStakeRequest,
//     isErrorStakeRequest,
//     isIdleStakeRequest,
//     isSuccessStakeRequest,
//     statusStakeRequest,
//   };
// };

// export default useStakeRequest;
