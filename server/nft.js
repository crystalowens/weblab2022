const Moralis = require('moralis/node');
const request = require('request');

const serverUrl = process.env.NFT_SERVER_URL;
const appId = process.env.NFT_APP_ID;

Moralis.start({ serverUrl, appId });;

function randomElement(array){
    return array[Math.floor(Math.random()*array.length)];
}

function metadataIsSufficent(metadata){
    return metadata.name && metadata.description && metadata.image;
}

async function getRandomMoralisNFT(){
    const queries = ['Bored Ape Yacht Club', 'Doodles', 
    'Mutant Ape Yacht Club', 'PhantaBear', 'CryptoSkulls', 'CryptoPunks',
    'Cool Cats NFT', 'The Space Bulls TSB', 'Decentraland', 'World of Women'];
    const query = randomElement(queries);
    const nfts = await Moralis.Web3API.token.searchNFTs({
        q: randomElement(queries),
        filter : "name",
        limit: 50
    });
    if(nfts.total == 0){
        const newAttempt = await getRandomMoralisNFT();
        return newAttempt;
    }
    return randomElement(nfts.result);
}

async function getMetaData(nft) {
    if(!nft.metadata){
        console.log('searching uri');
        const metadata = await request(nft.token_uri, (error, response, body) => {
            if(!error){
                return JSON.parse(body);
            }
        });
        return metadata;
    }
    else{
        console.log('it had metadata');
        return JSON.parse(nft.metadata);
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

    if(!metadataIsSufficent(metadata)){
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