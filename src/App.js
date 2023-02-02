import "./App.css";
import Marketplace from "./components/Marketplace";
import Profile from "./components/Profile";
import SellNFT from "./components/SellNFT";
import NFTPage from "./components/NFTpage";
import { Routes, Route } from "react-router-dom";
import { useAccount, useContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./config/constants";
import { ethers } from "ethers";

function App() {
	const { address } = useAccount();
	const contract = useContract({
		address: CONTRACT_ADDRESS,
		abi: CONTRACT_ABI,
		signerOrProvider: new ethers.providers.JsonRpcProvider("https://goerli.blockpi.network/v1/rpc/public"),
	});

	return (
		<div className='container'>
			<Routes>
				<Route path='/' element={<Marketplace contract={contract} />} />
				<Route path='/nftPage/:id' element={<NFTPage contract={contract} address={address} />} />
				<Route path='/profile' element={<Profile contract={contract} address={address} />} />
				<Route path='/sellNFT' element={<SellNFT contract={contract} address={address} />} />
			</Routes>
		</div>
	);
}

export default App;
