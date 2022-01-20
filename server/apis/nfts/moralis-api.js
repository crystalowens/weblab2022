
const Moralis = require('moralis/node');
const axios = require('axios');
const http = require('http');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const serverUrl = process.env.NFT_SERVER_URL;
const appId = process.env.NFT_APP_ID;
const apiId = process.env.NFT_API_ID;

Moralis.start({ serverUrl, appId });;

function search(query, limit = 500){
    return Moralis.Web3API.token.searchNFTs({
        q: query,
        filter : "name",
        offset : 0,
        limit: limit
    });
}

async function transfers(tokenAddress, tokenId) {
    try{
        const res = await fetch(`https://deep-index.moralis.io/api/v2/nft/${tokenAddress}/${tokenId}/transfers?chain=eth&format=decimal`, {
            method : 'GET',
            credentials : 'include',
            headers : {
                'Content-Type' : 'application/json',
                'x-api-key' : "qb8XkSdAPhYnbPhcZZ6hOjxVp1rG84AhK8oeWJsnrsH4fMJPg0F8RSWV0tHrrGTc"
            }
        });
        return res.json();
    }
    catch(err){
        console.log(`Error while fetching transfers for token address: ${tokenAddress} and id: ${tokenId}`);
        return Promise.resolve({total : 0, result : []});
    }
}

async function metadata(nft) {
    if(nft.metadata){
        return Promise.resolve(JSON.parse(nft.metadata));
    }
    else{
        return null;
    }
}

/*axios.get(nft.token_uri).then((res) => {
        try{
            const res = await axios.get(nft.token_uri);
            return JSON.parse(res.data);
        }
        catch(err){
            return null;
        }
        });*/

function convertWeiToEth(wei){
    return Moralis.Units.FromWei(wei);
}

module.exports = {
    search : search,
    transfers : transfers,
    metadata : metadata,
    convertWeiToEth : convertWeiToEth
}