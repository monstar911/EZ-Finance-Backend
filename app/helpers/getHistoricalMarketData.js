const fetch = require("node-fetch");
const Web3 = require("web3");
const { ChainIDs } = require("../constants/chainId");
const getURI = require("../constants/uri");
const getTokenPriceUrls = require("../constants/tokenPriceUrls");
const getMarketsUrl = require("../constants/marketsUrl");

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider(getURI(ChainIDs.BSCmainnet)));
}


let prices = {};

exports.historicalData = async () => {
    try {
        const url = getMarketsUrl();
        const res = await fetch(url);
        const data = await res.json();
        // console.log("url", url);
        // console.log("data", data);

        for (let i = 0; i < data.length; i++) {
            Object.keys(data[i]).map((key) => {
                if (key === 'symbol') {
                    switch (data[i]['symbol']) {
                        case 'apt':
                            prices['apt'] = data[i]['current_price'];
                            break;
                        case 'btc':
                            prices['wbtc'] = data[i]['current_price'];
                            break;
                        case 'weth':
                            prices['weth'] = data[i]['current_price'];
                            break;
                        case 'usdt':
                            prices['usdt'] = data[i]['current_price'];
                            break;
                        case 'usdc':
                            prices['usdc'] = data[i]['current_price'];
                            break;
                        case 'dai':
                            prices['dai'] = data[i]['current_price'];
                            break;
                        default:
                            break;
                    }
                }
            })
        }

        console.log("prices", prices);

        return prices;
    } catch (err) {
        console.log(err);

        return prices;
    }
};





