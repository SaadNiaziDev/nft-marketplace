import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { parseEther } from "ethers/lib/utils.js";

export default function NFTPage({ contract, address }) {
	const params = useParams();

	const [data, updateData] = useState({});
	const [message, updateMessage] = useState("");

	const getNftData = async (index) => {
		try {
			const metadata = await contract.getListedTokenForId(index);
			updateData(metadata);
		} catch (error) {
			console.log(error);
		}
	};

	const buyNFT = async () => {
		const price = data?.price / 10 ** 18;
		updateMessage("Purchase in progress. Please wait!");
		try {
			const tx = await contract.executeSale(params.id, { value: parseEther(price.toString()) });
			await tx.wait();
			updateMessage("NFT has been purchased successfully!");
		} catch (error) {
			console.log(error);
			updateMessage("Failed to purchase this NFT!");
		} finally {
			updateMessage("");
		}
	};

	useEffect(() => {
		if (contract) {
			getNftData(params.id);
		}
	}, [contract]);

	return (
		<div style={{ "min-height": "100vh" }}>
			<Navbar></Navbar>
			<div className='flex ml-20 mt-20'>
				<img src={data?.imgURL} alt='' className='w-2/5' />
				<div className='text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5'>
					<div>Name: {data?.name}</div>
					<div>Description: {data?.description}</div>
					<div>
						Price: <span className=''>{(data?.price?.toString() / 10 ** 18 || 0) + " ETH"}</span>
					</div>
					<div>
						Owner: <span className='text-sm'>{data?.ownedBy}</span>
					</div>
					<div>
						Seller: <span className='text-sm'>{data?.soldBy}</span>
					</div>
					{address && (
						<div>
							{address === data?.ownedBy || address === data?.soldBy ? (
								<div className='text-emerald-700'>You are the owner of this NFT</div>
							) : (
								<button
									className='enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm'
									onClick={() => buyNFT()}>
									Buy this NFT
								</button>
							)}

							<div className='text-green text-center mt-3'>{message}</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
