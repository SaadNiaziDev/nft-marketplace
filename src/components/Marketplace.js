import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./../config/constants"
export default function Marketplace() {
// const sampleData = [
//     {
//         "name": "NFT#1",
//         "description": "Alchemy's First NFT",
//         "website":"http://axieinfinity.io",
//         "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
//         "price":"0.03ETH",
//         "currentlySelling":"True",
//         "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
//     },
//     {
//         "name": "NFT#2",
//         "description": "Alchemy's Second NFT",
//         "website":"http://axieinfinity.io",
//         "image":"https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
//         "price":"0.03ETH",
//         "currentlySelling":"True",
//         "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
//     },
//     {
//         "name": "NFT#3",
//         "description": "Alchemy's Third NFT",
//         "website":"http://axieinfinity.io",
//         "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
//         "price":"0.03ETH",
//         "currentlySelling":"True",
//         "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
//     },
// ];
const [data, updateData] = useState([]);

const {refetch} = useContractRead({
    abi:CONTRACT_ABI,
    address:CONTRACT_ADDRESS,
    functionName:'getAllNFTs',
    enabled:false,
    onSuccess(data){
        console.log(data);
        updateData(data);
    }
});

useEffect(() => {
    refetch();
}, [])




return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-20">
            <div className="md:text-xl font-bold text-white">
                Top NFTs
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
        </div>            
    </div>
);

}