import { modalConnectors, walletConnectProvider, EthereumClient } from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const walletConnectProjectId = "ba7804e457fbb5f1375cbdc14e679617";

const chains = [goerli];

const { provider, webSocketProvider } = configureChains(chains, [publicProvider()]);

export const client = createClient({
	autoConnect: true,
	connectors: modalConnectors({ appName: "My wagmi + Web3Modal App", chains }),
	provider,
	webSocketProvider,
});

export const ethereumClient = new EthereumClient(client, chains);
