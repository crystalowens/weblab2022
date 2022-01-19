const Moralis = require('moralis/node');
const request = require('request');
const { SingleEntryPlugin } = require('webpack');
const sources = require('./nft-sources.js');

const serverUrl = process.env.NFT_SERVER_URL;
const appId = process.env.NFT_APP_ID;

Moralis.start({ serverUrl, appId });;

function randomNum(begin, end){
    return Math.floor(Math.random() * (end - begin)) + begin;
}
function randomElement(array){
    return array[randomNum(0, array.length)];
}

function metadataIsSufficent(metadata){
    if(!metadata.description){
        metadata.description = "No description Provided";
    }
    return metadata.name && metadata.image; //these two are absolutely necessary
}

function findSource(token_uri){
    for(const source in sources){
        if (token_uri.includes(source)){
            return sources[source];
        } 
    }
    return null;
}

function normalizeMetaData(metadata, token_uri){
    const format = findSource(token_uri);
    return {
        name : metadata[format.name],
        description : metadata[format.description],
        image : metadata[format.image]
    };
}

async function searchNFTs(query){
    return Moralis.Web3API.token.searchNFTs({
        q: query,
        filter : "name",
        offset : 0,
        limit: 50
    });
}


function findValidNft(nfts){
    const filteredNfts = nfts.result.filter((nft) => {
        return findSource(nft.token_uri) != null;
    });
    console.log(`Collapsed a total of ${nfts.result.length} to a collection of ${filteredNfts.length} valid nfts`);
    if(filteredNfts.length == 0){
        throw 'No valid formats for this NFT';
    }
    const nft = randomElement(filteredNfts);
    console.log(`Picked random nft: ${nft.token_address}, id: ${nft.token_id}, uri: ${nft.token_uri.substring(0, 10)}...`);
    return nft;
}
/*
['Bored Ape Yacht Club', 'Doodles', 
    'Mutant Ape Yacht Club', 'PhantaBear', 'CryptoSkulls', 'CryptoPunks',
    'Cool Cats NFT', 'The Space Bulls TSB', 'Decentraland', 'World of Women']
*/ 

async function getRandomMoralisNFT(){
    const query = randomElement(['Bored Ape Yacht Club', 'Doodles', 
    'Mutant Ape Yacht Club', 'PhantaBear', 'CryptoSkulls', 'CryptoPunks',
    'Cool Cats', 'The Space Bulls TSB', 'Decentraland', 'World of Women']);
    const nfts = await searchNFTs(query);
    console.log(`Searched \"${query}\" and found ${nfts.total} results`);
    if(nfts.total == 0){
        console.log(`Found 0 searches while searching for ${query}`);
        const newAttempt = await getRandomMoralisNFT();
        return newAttempt;
    }
    else{
        return await findValidNft(nfts);
    }
}

async function getMetaData(nft) {
    if(!nft.metadata){
        console.log('Searching for nft metadata manually. Should not be done excessively.');
        const metadata = await request(nft.token_uri, (error, response, body) => {
            return normalizeMetaData(JSON.parse(body), nft.token_uri);
        });
        return metadata;
    }
    else{
        return normalizeMetaData(JSON.parse(nft.metadata), nft.token_uri);
    }
}

async function getPricing(nft) {
    const trades = await Moralis.Web3API.token.getNFTTrades({ 
        address: nft.token_address, 
        limit: "200" 
    });
    if(trades.total == 0){
        return { price : 0, sold : Date.now() };
    }
    trades.result.sort((lhs, rhs) => {
        const lhsDate = new Date(lhs.block_timestamp);
        const rhsDate = new Date(rhs.block_timestamp);
        if(lhsDate.getTime() == rhsDate.getTime()) return 0;
        else if (lhsDate < rhsDate) return 1;
        else return -1;
    });
    const lastTransaction = trades.result[0];
    if(!lastTransaction.price || !lastTransaction.block_timestamp) throw 'Could Not find prices';
    return {
        price : Moralis.Units.FromWei(lastTransaction.price),
        sold : lastTransaction.block_timestamp
    };
}

async function getPricingAndMetaData(){
    const [pricing, metadata] = await getRandomMoralisNFT().then((nft) => {
        return Promise.all([getPricing(nft), getMetaData(nft)]);
    });
    console.log(`Retrieved Pricing: ${pricing.price}eth and sold on ${pricing.sold}`);
    console.log(`Retrieved Metadata: ${metadata.name}, and description: ${metadata.description}, and image: ${metadata.image}`);
    if(!metadataIsSufficent(metadata)){
        console.log('However, metadata wasnt sufficent: new attempt');
        const newAttempt = await getPricingAndMetaData();
        return newAttempt;
    }
    else{
        return [pricing, metadata];
    }
}

async function randomNFT() {
    const [pricing, metadata] = await getPricingAndMetaData();
    return {
        name : metadata.name,
        description : metadata.description,
        image : metadata.image,
        price : pricing.price,
        sold : pricing.sold
    };
}

module.exports = {
    randomNFT : randomNFT
};