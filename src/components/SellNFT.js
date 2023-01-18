import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from '../Marketplace.json';
import { useLocation } from "react-router";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config/constants"
import { parseEther } from "ethers/lib/utils.js";
const ethers = require("ethers");

export default function SellNFT () {
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
    const [fileData, setFileData] = useState(null);
    const [message, updateMessage] = useState('');
    const {address} = useAccount();
    const location = useLocation();


    const {writeAsync,reset, data} = useContractWrite({
        address: CONTRACT_ADDRESS,
        abi:CONTRACT_ABI,
        functionName:'createToken',
        onError(err){
            console.log(err)
        }
    })

    const waitForTransaction  = useWaitForTransaction({
        hash:data?.hash,
        onSuccess(data){
            console.log(data)
            updateMessage("Successfully listed on marketPlace");
            updateFormParams({ name: '', description: '', price: ''});
            setFileData(null)
        },
        onError(err){
            console.log(err)
        }
    })


    function onFileUpload(e){
        let file = e.target.files[0];
        uploadFileToIPFS(file).then((result) => {
            setFileData(result.pinataURL);
        })
    }

    function uploadNft(e){
        e.preventDefault();
        let {name, description, price} = formParams;
        writeAsync?.({
            recklesslySetUnpreparedArgs:[fileData,parseEther(price),name,description],
            recklesslySetUnpreparedOverrides: {
                from: address,
                value: ethers.utils.parseEther('0.01'),
            },
        });
    }

    useEffect(() => {
      reset();
      console.log("rendering");
    }, [])
    

    return (
        <div className="">
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-10" id="nftForm">
            <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <h3 className="text-center font-bold text-purple-500 mb-8">Upload your NFT to the marketplace</h3>
                <div className="mb-4">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="description">NFT Description</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection" value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}></textarea>
                </div>
                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
                </div>
                <div>
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Image</label>
                    <input type={"file"} onChange={(e)=>onFileUpload(e)}></input>
                </div>
                <br></br>
                <div className="text-green text-center">{message}</div>
                <button onClick={(e)=>uploadNft(e)} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                    List NFT
                </button>
            </form>
        </div>
        </div>
    )
}