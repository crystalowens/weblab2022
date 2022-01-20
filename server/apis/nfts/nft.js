
const sources = require('./pricing.js');
const { randomMoralisNft } = require('./nft-pool');
const { getPricing } = require('./pricing.js');

async function randomNFT() {
    return randomMoralisNft().then((nft) => {
        return getPricing(nft).then((pricing) => {  
            console.log(`Retrieved NFT: ${nft.metadata.name}`);  
            console.log(`Priced at: ${pricing.price}eth and sold on ${pricing.sold}`);
            console.log(`Description: ${nft.metadata.description}, and image: ${nft.metadata.image}`);
            return {
                name : nft.metadata.name,
                description : nft.metadata.description,
                image : nft.metadata.image,
                price : pricing.price,
                sold : pricing.sold
            };
        });
    });
}

module.exports = {
    randomNFT : randomNFT
};