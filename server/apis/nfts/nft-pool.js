
const moralis = require('./moralis-api.js');
const random = require('../../util/random.js');
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
    console.log(`Picked random nft: ${nft.tokenAddress}, id: ${nft.tokenId}, uri: ${nft.tokenUri.substring(0, 100)}...`);
    return nft;

}

async function startCollecting(){
    const allQueries = ['Bored Ape Yacht Club', 'Doodles', 
        'Mutant Ape Yacht Club', 'PhantaBear', 'CryptoSkulls', 'CryptoPunks',
        'Cool Cats', 'The Space Bulls TSB', 'Decentraland', 'World of Women'];
    for (const query of allQueries) {
        const nfts = await retrieveAllNfts(query);
        let totalPushed = 0;
        for (const nft of nfts){
            const metadata = await moralis.metadata(nft);
            if(!isValidMetadata(metadata)) continue;
            totalPushed++;
            nftPool.push({
                tokenAddress : nft.token_address,
                tokenId : nft.token_id,
                tokenUri : nft.token_uri,
                metadata : formatMetadata(metadata, nft.token_uri)
            });
        }
        console.log(`Of the total nfts, only ${totalPushed} had displayable metadata`);
    }
}

startCollecting();

module.exports = {
    randomMoralisNft : randomMoralisNft
};