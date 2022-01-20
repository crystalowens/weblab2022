
const moralis = require('./moralis-api.js');
const debug = require('../../util/debug.js');

async function mostRecentPurchase(nft){
    const transactions = await moralis.transfers(nft.tokenAddress, nft.tokenId);
    if(transactions.total == 0){
        return { value : 0, sold : Date.now() };
    }
    transactions.result.sort((lhs, rhs) => {
        const lhsDate = new Date(lhs.block_timestamp);
        const rhsDate = new Date(rhs.block_timestamp);
        if(lhsDate.getTime() == rhsDate.getTime()) return 0;
        else if (lhsDate < rhsDate) return 1;
        else return -1;
    });
    return transactions.result[0];
}

async function getPricing(nft) {
    const lastPurchase = await mostRecentPurchase(nft); 
    if(!lastPurchase.block_timestamp) 
        throw 'Could Not find prices';
    if(lastPurchase.value == null)
        lastPurchase.value = 0;
    return {
        price : moralis.convertWeiToEth(lastPurchase.value),
        sold : lastPurchase.block_timestamp
    };
}

module.exports = {
    getPricing : getPricing
};