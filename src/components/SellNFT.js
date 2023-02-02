import Navbar from "./Navbar";
import { useState } from "react";
import { uploadFileToIPFS } from "../pinata";
import { parseEther } from "ethers/lib/utils.js";
const ethers = require("ethers");

export default function SellNFT({ contract, address }) {
	const [formParams, updateFormParams] = useState({ name: "", description: "", price: "" });
	const [message, updateMessage] = useState("");
	const [file, updateFile] = useState("");

	const listNFT = async (uri) => {
		try {
			updateMessage("Please wait! NFT listing is in progress.");
			let { name, price, description } = formParams;
			const tx = await contract.createToken(uri, parseEther(price), name, description, {
				from: address,
				value: ethers.utils.parseEther("0.01"),
			});
			await tx.wait();
			updateMessage("Successfully listed on marketPlace");
		} catch (error) {
			console.log(error);
			updateMessage("Failed to list nft on marketPlace");
		} finally {
			updateFormParams({ name: "", description: "", price: "" });
			updateFile("");
			updateMessage("");
		}
	};

	const handleImageChange = (event) => {
		updateFile(event.target.files[0]);
	};

	function uploadNft(e) {
		e.preventDefault();
		uploadFileToIPFS(file).then((result) => {
			listNFT(result.pinataURL);
		});
	}

	return (
		<div className=''>
			<Navbar></Navbar>
			<div className='flex flex-col place-items-center mt-10' id='nftForm'>
				<form className='bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4'>
					<h3 className='text-center font-bold text-purple-500 mb-8'>Upload your NFT to the marketplace</h3>
					<div className='mb-4'>
						<label className='block text-purple-500 text-sm font-bold mb-2' htmlFor='name'>
							NFT Name
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='name'
							type='text'
							placeholder='Axie#4563'
							onChange={(e) => updateFormParams({ ...formParams, name: e.target.value })}
							value={formParams.name}></input>
					</div>
					<div className='mb-6'>
						<label className='block text-purple-500 text-sm font-bold mb-2' htmlFor='description'>
							NFT Description
						</label>
						<textarea
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							cols='40'
							rows='5'
							id='description'
							type='text'
							placeholder='Axie Infinity Collection'
							value={formParams.description}
							onChange={(e) => updateFormParams({ ...formParams, description: e.target.value })}></textarea>
					</div>
					<div className='mb-6'>
						<label className='block text-purple-500 text-sm font-bold mb-2' htmlFor='price'>
							Price (in ETH)
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							type='number'
							placeholder='Min 0.01 ETH'
							step='0.01'
							value={formParams.price}
							onChange={(e) => updateFormParams({ ...formParams, price: e.target.value })}></input>
					</div>
					<div>
						<label className='block text-purple-500 text-sm font-bold mb-2' htmlFor='image'>
							Upload Image
						</label>
						<input type={"file"} onChange={handleImageChange}></input>
					</div>
					<br></br>
					<div className='text-green text-center'>{message}</div>
					<button
						onClick={(e) => uploadNft(e)}
						disabled={
							formParams.name === "" || formParams.description === " " || formParams.price === "" || file === ""
						}
						className='font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg'>
						List NFT
					</button>
				</form>
			</div>
		</div>
	);
}
