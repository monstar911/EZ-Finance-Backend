const {ChainIDs} = require("./chainId");

const getURI = (chainID) => {
    if(chainID === ChainIDs.BSCmainnet) return "https://bsc-dataseed1.binance.org";
    if(chainID === ChainIDs.BSCtestnet) return "https://bsc-testnet.public.blastapi.io";
}
module.exports = getURI;
