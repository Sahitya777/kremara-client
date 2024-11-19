import  ERC20Abi  from "../abis/erc20_abi.json";
import { useAccount, useContractRead } from "@starknet-react/core";
const useBalanceOf = (asset: string) => {
    const { address: accountAddress } = useAccount();
    ////console.log("dataaaa balance of", asset, accountAddress)
    const {
      data: dataBalanceOf,

      error: errorBalanceOf,

      isLoading: isLoadingBalanceOf,
      isSuccess: isSuccessBalanceOf,
      isFetching: isFetchingBalanceOf,
      refetch: refetchBalanceOf,
      status: statusBalanceOf,
    } = useContractRead({
      functionName: "balanceOf",
      args: [accountAddress as string],
      address: asset,
      abi: ERC20Abi,
      watch: false,
    })

  return {
    dataBalanceOf,
    errorBalanceOf,
    isFetchingBalanceOf,
    refetchBalanceOf,
    statusBalanceOf,
  };
};

export default useBalanceOf;
