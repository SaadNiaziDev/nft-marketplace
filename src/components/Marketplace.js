import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Marketplace({ contract }) {
	const [data, updateData] = useState([]);

	const getNftData = async (params) => {
		try {
			const nfts = await contract.getAllNFTs();
			updateData(nfts);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getNftData();
	}, []);

	return (
		<div>
			<Navbar></Navbar>
			<div className='flex flex-col place-items-center mt-20'>
				<div className='md:text-xl font-bold text-white'>Top NFTs</div>
				<div className='flex mt-5 justify-between flex-wrap max-w-screen-xl text-center'>
					{data.map((value, index) => {
						return <NFTTile data={value} key={index}></NFTTile>;
					})}
				</div>
			</div>
		</div>
	);
}
