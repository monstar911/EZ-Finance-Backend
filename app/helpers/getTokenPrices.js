const fetch = require("node-fetch");
const Web3 = require("web3");
const { ChainIDs } = require("../constants/chainId");
const getURI = require("../constants/uri");
const getTokenPriceUrls = require("../constants/tokenPriceUrls");

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider(getURI(ChainIDs.BSCmainnet)));
}
let prices = {};

exports.fetchTokenPrices = async (tokenName) => {
    try {
        const apiId = getTokenPriceUrls(tokenName).APIID;
        const url = getTokenPriceUrls(tokenName).URL;
        const res = await fetch(url);
        const data = await res.json();
        prices[tokenName] = data[apiId].usd;
        return prices[tokenName];
    } catch (err) {
        // console.log(err);
        return prices[tokenName];
    }
};





