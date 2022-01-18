const Moralis = require('moralis/node');

const serverUrl = process.env.NFT_SERVER_URL;
const appId = process.env.NFT_APP_ID;
console.log(serverUrl);

Moralis.start({ serverUrl, appId });;

const queries = ['Bored Ape Yacht Club', 'Doodles', 
'Mutant Ape Yacht Club', 'PhantaBear', 'CryptoSkulls', 'CryptoPunks',
'Cool Cats NFT', 'The Space Bulls TSB', 'Decentraland', 'World of Women'];


function randomElement(array){
    return array[Math.floor(Math.random()*array.length)];
}

async function randomNFT() {
    const nfts = await Moralis.Web3API.token.searchNFTs({
        q: randomElement(queries),
        limit: 25
    });
    const nft = randomElement(nfts.result);

    const transaction = await getNFTTransaction(nft.token_address);
    const nftMetaData = JSON.parse(nft.metadata);
    return verifyValidNFT({
        name : nftMetaData.name,
        description : nftMetaData.description,
        image : nftMetaData.image,
        price : transaction.price,
        sold : transaction.sold
    });
}

async function getNFTTransaction(tokenAddress) {
    const options = { address: tokenAddress, limit: "200" };
    const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);
    //TODO: results can be 0, so possibly make a gaurd for that
    const results = NFTTrades.result;
    results.sort((lhs, rhs) => {
        const lhsDate = new Date(lhs.block_timestamp);
        const rhsDate = new Date(rhs.block_timestamp);
        if(lhsDate.getTime() == rhsDate.getTime()){
            return 0;
        }
        else if(lhsDate < rhsDate){
            return 1;
        }
        else{
            return -1;
        }
    });

    const lastTransaction = results[0];
    return {
        price : (lastTransaction.price ? Moralis.Units.FromWei(lastTransaction.price) : undefined),
        sold : lastTransaction.block_timestamp
    };
}

async function verifyValidNFT(nft){
    if(nft.name && nft.description && nft.image && nft.price && nft.sold) {
        return nft;
    }
    else{
        return randomNFT();
    }
}

module.exports = {
    randomNFT : randomNFT
};