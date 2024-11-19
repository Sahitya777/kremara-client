// import DeployDetailsProd from "../../contract_addresses.json";
// import DeployDetailsProd from "../../contract_addresses_new.json";
import DeployDetailsProd from "../../contract_addresses.json";
// import ERC20Abi from "./abis/erc20_abi.json";
// import ERC20Abi from "./abi_new/erc20_abi.json";
// import ERC20Abi from "./abis_upgrade/erc20_abi.json";
import ERC20Abi from "../Blockchain/abis/erc20_abi.json";
import { RpcProvider,num } from "starknet";
import { UseWaitForTransactionResult } from "@starknet-react/core";

export function processAddress(address: string) {
  return num.toHex(num.toBigInt(address));
}
// let contractsEnv =
//   process.env.NODE_ENV === "development"
//     ? DeployDetailsDev.devn\et
//     : DeployDetailsProd.goerli_2;
let contractsEnv:any = process.env.NEXT_PUBLIC_NODE_ENV=="testnet" ? DeployDetailsProd.sepolia : DeployDetailsProd.mainnet;
contractsEnv.DIAMOND_ADDRESS = contractsEnv.DIAMOND_ADDRESS;
for (let i = 0; i < contractsEnv.TOKENS.length; ++i) {
  contractsEnv.TOKENS[i].address = processAddress(
    contractsEnv.TOKENS[i].address
  );
}
export const getProvider = () => {
  const rpctestnetUrl=String(process.env.NEXT_PUBLIC_INFURA_TESTNET);
  const rpcUrl=String(process.env.NEXT_PUBLIC_INFURA_MAINNET);
  if (contractsEnv == DeployDetailsProd.sepolia) {
    const provider = new RpcProvider({ nodeUrl: rpctestnetUrl});
    return provider;
  }
  else {
    const provider = new RpcProvider({ nodeUrl: rpcUrl});
    return provider;

  }
}

export const stakingContractAddress: string =
  contractsEnv.STAKING_ADDRESS;


export const getTokenFromAddress = (address: string) => {
  return contractsEnv.TOKENS.find((item:any) => item?.address === address);
};

export const getRTokenFromAddress = (address: string) => {
  return contractsEnv.rTOKENS.find((item:any) => item?.address === address);
};

export const getDTokenFromAddress = (address: string) => {
  return contractsEnv.dTOKENS.find((item:any) => item?.address === address);
};

export { ERC20Abi, contractsEnv };
