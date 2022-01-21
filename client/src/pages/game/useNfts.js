import React from "react";
import { useEffect, useState } from "react";
import useNftPool from "./useNftPool.js";

function useNfts() {
    const getNft = useNftPool();
    const [leftNft, setLeftNft] = useState(null);
    const [rightNft, setRightNft] = useState(null);

    const newNfts = () => {
        setLeftNft(null); setRightNft(null);
        return Promise.all([
            getNft().then((nft) => { console.log(`left price: ${nft.price}`);setLeftNft(nft);}),
            getNft().then((nft) => { console.log(`right price: ${nft.price}`);setRightNft(nft)})
        ]);
    }    

    return [leftNft, rightNft, newNfts];
}

export default useNfts;