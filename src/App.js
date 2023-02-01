import "./App.css";
import Navbar from "./components/Navbar.js";
import Marketplace from "./components/Marketplace";
import Profile from "./components/Profile";
import SellNFT from "./components/SellNFT";
import NFTPage from "./components/NFTpage";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { goerli } from "wagmi/chains";
import { useAccount, useContract, useSigner } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./config/constants";

function App() {
	const { data: signer } = useSigner({
		chainId: goerli.id,
	});
	const { address } = useAccount();
	const contract = useContract({
		address: CONTRACT_ADDRESS,
		abi: CONTRACT_ABI,
		signerOrProvider: signer,
	});

	return (
		<div className='container'>
			<Routes>
				<Route path='/' element={<Marketplace contract={contract} />} />
				<Route path='/nftPage/:id' element={<NFTPage contract={contract} address={address} />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/sellNFT' element={<SellNFT />} />
			</Routes>
		</div>
	);
}

export default App;
