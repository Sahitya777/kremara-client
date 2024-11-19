import { contractsEnv } from "../stark-constants";


export const getTokenFromName = (name: string) => {
  return contractsEnv.TOKENS.find((Token:any) => Token.name == name);
};

export const getRTokenFromName = (name: string) => {
  return contractsEnv.rTOKENS.find((rToken:any) => rToken.name == name);
};

export const getDTokenFromName = (name: string) => {
  return contractsEnv.dTOKENS.find((dToken:any) => dToken.name == name);
};
export const getTokenFromAddress = (address: string) => {
  return contractsEnv?.TOKENS?.find((val: any) => val?.address == address);
};

export const tokenAddressMap:  any = {
  BTC: getTokenFromName("BTC")?.address,
  USDT: getTokenFromName("USDT")?.address,
  USDC: getTokenFromName("USDC")?.address,
  ETH: getTokenFromName("ETH")?.address,
  DAI: getTokenFromName("DAI")?.address,
  STRK:getTokenFromName("STRK")?.address,
};

export const tokenDecimalsMap: any = {
  BTC: getTokenFromName("BTC")?.decimals,
  USDT: getTokenFromName("USDT")?.decimals,
  USDC: getTokenFromName("USDC")?.decimals,
  ETH: getTokenFromName("ETH")?.decimals,
  DAI: getTokenFromName("DAI")?.decimals,
  STRK:getTokenFromName("STRK")?.decimals,
};
