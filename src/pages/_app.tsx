import "@/styles/globals.css";
import { mainnet, sepolia } from "@starknet-react/chains";
import { argent, braavos, publicProvider, StarknetConfig, useInjectedConnectors, voyager } from "@starknet-react/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [
      argent(),
      braavos(),
    ],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: "onlyIfNoConnectors",
    // Randomize the order of the connectors.
    order: "random"
  });
  return(
    <StarknetConfig
    chains={[mainnet, sepolia]}
    provider={publicProvider()}
    connectors={connectors}
    explorer={voyager}
  >
    <Component {...pageProps} />
  </StarknetConfig>
  )
}
