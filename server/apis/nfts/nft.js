
const sources = require('./pricing.js');
const { randomMoralisNft } = require('./nft-pool');


async function randomNFT() {
    return randomMoralisNft().then((nft) => {
        //console.log(`Retrieved NFT: ${nft.name}`);  
        //console.log(`Priced at: ${nft.price}eth and sold on ${nft.sold}`);
        //console.log(`Description: ${nft.description}, and image: ${nft.image}`);
        return nft;
    });
}

module.exports = {
    randomNFT : randomNFT
};