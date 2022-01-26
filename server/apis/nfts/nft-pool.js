
const moralis = require('./moralis-api.js');
const util = require('util');
const random = require('../../util/random.js');
const { getPricing } = require('./pricing.js');
const { randomElement } = require('../../util/random.js');
const { isFormattableMetadata, formatMetadata, isValidMetadata } = require('./valid-metadata.js');

function collapseNfts(nfts){
    const filteredNfts = nfts.result.filter((nft) => {
        return isFormattableMetadata(nft.token_uri);
    });
    console.log(`Collapsed a total of ${nfts.result.length} to a collection of ${filteredNfts.length} valid nfts`);
    return filteredNfts;
}

async function retrieveAllNfts(query){
    const nfts = await moralis.search(query, 1000);
    console.log(`Searched \"${query}\" and found ${nfts.total} results`);
    if(nfts.total == 0) { return []; }
    return collapseNfts(nfts);
}
/*
{
    tokenAddress:,
    tokenId:,
    tokenUri:,
    metadata:,
}
*/
const nftPool = [];

async function randomMoralisNft(){
    const nft = randomElement(nftPool);
    try{
    console.log(`Picked random nft: ${nft.name}, id: ${nft.price}, uri: ${nft.description.substring(0, 100)}...`);
    }
    catch(exc) {
        console.log(util.inspect(nft, {depth: 2}));
    }
    return nft;
}


async function validateNft(nft){
    const metadata = await moralis.metadata(nft);
    if(!isValidMetadata(metadata)) return null;
    const newNft = {
        tokenAddress : nft.token_address,
        tokenId : nft.token_id,
        tokenUri : nft.token_uri,
        metadata : formatMetadata(metadata, nft.token_uri)
    };
    const pricing = await getPricing(newNft);
    if(pricing.price != 0){
        return {
            name : newNft.metadata.name,
            description : newNft.metadata.description,
            image : newNft.metadata.image,
            price : pricing.price,
            sold : pricing.sold
        };
    }
    else{
        return null;
    }
}

//'World of Women' started posted a bunch of same pieces. have to take it out. no displayables: decentraland, usuland, space bulls
async function startCollecting(){
    const allQueries = ['Bored Ape Yacht Club', 'Doodles', 
        'Mutant Ape Yacht Club', 'PhantaBear', 'CryptoSkulls', 'CryptoPunks',
        'Cool Cats', 'Azuki', 'Zxdiac'];
    for (const query of allQueries) {
        const nfts = await retrieveAllNfts(query);
        let totalPushed = 0;
        for (const nft of nfts){
            const validatedNft = await validateNft(nft);
            if(validatedNft != null){
                nftPool.push(validatedNft);
                totalPushed++;
            }
        }
        console.log(`Of the total nfts, only ${totalPushed} had displayable metadata`);
    }
}

startCollecting();

module.exports = {
    randomMoralisNft : randomMoralisNft
};