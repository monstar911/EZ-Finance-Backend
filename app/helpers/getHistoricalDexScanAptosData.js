const fetch = require("node-fetch");
// const Web3 = require("web3");
// const { ChainIDs } = require("../constants/chainId");
// const getURI = require("../constants/uri");
// const getTokenPriceUrls = require("../constants/tokenPriceUrls");
// const getMarketsUrl = require("../constants/marketsUrl");

// if (typeof web3 !== 'undefined') {
//     var web3 = new Web3(web3.currentProvider)
// } else {
//     var web3 = new Web3(new Web3.providers.HttpProvider(getURI(ChainIDs.BSCmainnet)));
// }

const coins = {
    ezm: { name: 'EZM', symbol: 'ezm', logo: 0 },
    apt: { name: 'APT', symbol: 'apt', logo: 0 },
    wbtc: { name: 'WBTC', symbol: 'wbtc', logo: 0 },
    weth: { name: 'WETH', symbol: 'weth', logo: 0 },
    usdt: { name: 'USDT', symbol: 'usdt', logo: 0 },
    usdc: { name: 'USDC', symbol: 'usdc', logo: 0 },
    cake: { name: 'Cake', symbol: 'cake', logo: 0 },
    sol: { name: 'SOL', symbol: 'sol', logo: 0 },
    bnb: { name: 'BNB', symbol: 'bnb', logo: 0 },
}

// Pools
// PancakeSwap:
// 1. APT/USDC
// 2. WETH/USDC
// 3. Cake/APT
// 4. BNB/USDC
// 5. USDC/USDT

// LiquidSwap:
// 1. APT/USDC
// 2. Weth/USDC
// 3. Weth/apt
// 4. Wbtc/apt

// AUX:
// 1. APT/USDC 
// 2. Sol/USDC
// 3. Weth/USDC
// 4. Wbtc/USDC
// 5. USDC/USDT
const pairs = {
    pancake: {
        'apt-usdc': {
            x: coins.apt,
            y: coins.usdc
        },
        'weth-usdc': {
            x: coins.weth,
            y: coins.usdc
        },
        'cake-apt': {
            x: coins.cake,
            y: coins.apt
        },
        'bnb-usdc': {
            x: coins.bnb,
            y: coins.usdc
        },
        'usdc-usdt': {
            x: coins.usdc,
            y: coins.usdt
        },
    },

    liquid: {
        'apt-usdc': {
            x: coins.apt,
            y: coins.usdc
        },
        'weth-usdc': {
            x: coins.weth,
            y: coins.usdc
        },
        'weth-apt': {
            x: coins.weth,
            y: coins.apt
        },
        'wbtc-apt': {
            x: coins.wbtc,
            y: coins.apt
        },
    },

    aux: {
        'apt-usdc': {
            x: coins.apt,
            y: coins.usdc
        },
        'sol-usdc': {
            x: coins.sol,
            y: coins.usdc
        },
        'weth-usdc': {
            x: coins.weth,
            y: coins.usdc
        },
        'wbtc-apt': {
            x: coins.wbtc,
            y: coins.apt
        },
        'usdc-usdt': {
            x: coins.usdc,
            y: coins.usdt
        },
    }
}

let datas24H_temp = {
    pancake: {
        'apt-usdc': { vol: 0, liquidity: 0 },
        'weth-usdc': { vol: 0, liquidity: 0 },
        'cake-apt': { vol: 0, liquidity: 0 },
        'bnb-usdc': { vol: 0, liquidity: 0 },
        'usdc-usdt': { vol: 0, liquidity: 0 },
    },

    liquid: {
        'apt-usdc': { vol: 0, liquidity: 0 },
        'weth-usdc': { vol: 0, liquidity: 0 },
        'weth-apt': { vol: 0, liquidity: 0 },
        'wbtc-apt': { vol: 0, liquidity: 0 },
    },

    aux: {
        'apt-usdc': { vol: 0, liquidity: 0 },
        'sol-usdc': { vol: 0, liquidity: 0 },
        'weth-usdc': { vol: 0, liquidity: 0 },
        'wbtc-apt': { vol: 0, liquidity: 0 },
        'usdc-usdt': { vol: 0, liquidity: 0 },
    }
}

let datas24H = {
    pancake: {
        'apt-usdc': { vol: 0, liquidity: 0 },
        'weth-usdc': { vol: 0, liquidity: 0 },
        'cake-apt': { vol: 0, liquidity: 0 },
        'bnb-usdc': { vol: 0, liquidity: 0 },
        'usdc-usdt': { vol: 0, liquidity: 0 },
    },

    liquid: {
        'apt-usdc': { vol: 0, liquidity: 0 },
        'weth-usdc': { vol: 0, liquidity: 0 },
        'weth-apt': { vol: 0, liquidity: 0 },
        'wbtc-apt': { vol: 0, liquidity: 0 },
    },

    aux: {
        'apt-usdc': { vol: 0, liquidity: 0 },
        'sol-usdc': { vol: 0, liquidity: 0 },
        'weth-usdc': { vol: 0, liquidity: 0 },
        'wbtc-apt': { vol: 0, liquidity: 0 },
        'usdc-usdt': { vol: 0, liquidity: 0 },
    }
}


exports.historicalData = async () => {
    let hasNextPage = true;
    let first = true;
    let offset = 1;

    // clearTempData() = () => {
    Object.keys(pairs).forEach((dex) => {
        for (let pair in pairs[dex]) {
            datas24H_temp[dex][pair]['vol'] = 0;
            datas24H_temp[dex][pair]['liquidity'] = 0;
        }
    })
    // };

    while (hasNextPage) {
        try {
            offset = (first ? offset : offset + 50);

            // const url = "https://api.coinmarketcap.com/dexer/v3/platformpage/pair-pages?platform-id=141&dexer-id=4788&sort-field=volumeUsd24h&operation=next&desc=true&offset=" + offset;
            const url = "https://api.coinmarketcap.com/dexer/v3/platformpage/pair-pages?platform-id=141&sort-field=volumeUsd24h&operation=next&desc=true&offset=" + offset;
            const res = await fetch(url);
            const resp = await res.json();

            // console.log("url", url);
            // console.log("resp", resp);

            const status = resp.status;
            const data = resp.data;

            hasNextPage = data.hasNextPage;

            const count = data.count;
            const total = data.total;
            const dataTimeStamp = data.dataTimeStamp;
            const dexerTxns24h = data.dexerVolume24h;
            const dexerVolume24h = data.dexerVolume24h;
            const usdVolume24h = data.usdVolume24h;
            const pageList = data.pageList;
            console.log("pageList", pageList.length);
            if (pageList.length === 0 || offset > 300) {
                console.log("offset", offset);
                break;
            }

            console.log("total", total);
            analizePage(pageList);
        } catch (err) {
            console.log(err);
        }

        await sleep(10000);
        first = false;
        console.log(offset);
        console.log(hasNextPage);
    }

    // set24HData() = () => {
    Object.keys(pairs).forEach((dex) => {
        for (let pair in pairs[dex]) {
            if (datas24H_temp[dex][pair]['vol'] !== undefined) {
                datas24H[dex][pair]['vol'] = datas24H_temp[dex][pair]['vol'];
            }

            if (datas24H_temp[dex][pair]['liquidity'] !== undefined) {
                datas24H[dex][pair]['liquidity'] = datas24H_temp[dex][pair]['liquidity'];
            }
        }
    })
    // };

    console.log('datas24H', datas24H);

    return datas24H;
};

// const analizePage = (pageList) => {
//     // console.log('analizePage', pageList.length);

//     Object.keys(pairs).forEach((dex) => {
//         for (let pair in pairs[dex]) {
//             if (datas24H[dex][pair]['vol'] !== 0 && datas24H[dex][pair]['liquidity'] !== 0) {
//                 continue;
//             }

//             for (let i = 0; i < pageList.length; i++) {
//                 // console.log(pairs[dex][pair].x.name, pageList[i]['dexerName'], pageList[i]['baseTokenSymbol'], pageList[i]['quotoTokenSymbol'], pageList[i]['volumeUsd24h'], pageList[i]['liquidity']);

//                 if (pageList[i]['baseTokenSymbol'].indexOf(pairs[dex][pair].x.name) === 0 && pageList[i]['quotoTokenSymbol'].indexOf(pairs[dex][pair].y.name) === 0) {
//                     if (pageList[i]['dexerName'].indexOf('PancakeSwap') === 0) {
//                         datas24H[dex][pair]['vol'] = pageList[i]['volumeUsd24h'];
//                         datas24H[dex][pair]['liquidity'] = pageList[i]['liquidity'];
//                         break;
//                     } else if (pageList[i]['dexerName'].indexOf('Liquidswap') === 0) {
//                         datas24H[dex][pair]['vol'] = pageList[i]['volumeUsd24h'];
//                         datas24H[dex][pair]['liquidity'] = pageList[i]['liquidity'];
//                     } else if (pageList[i]['dexerName'].indexOf('AUX Exchange') === 0) {
//                         datas24H[dex][pair]['vol'] = pageList[i]['volumeUsd24h'];
//                         datas24H[dex][pair]['liquidity'] = pageList[i]['liquidity'];
//                     }
//                 }
//             }
//         }
//     })

//     console.log("datas24H", datas24H);
// };

const analizePage = (pageList) => {
    // console.log('analizePage', pageList.length);

    let dex;
    for (let i = 0; i < pageList.length; i++) {
        if (pageList[i]['dexerName'].indexOf('PancakeSwap') === 0) {
            dex = 'pancake';
        } else if (pageList[i]['dexerName'].indexOf('Liquidswap') === 0) {
            dex = 'liquid';
        } else if (pageList[i]['dexerName'].indexOf('AUX Exchange') === 0) {
            dex = 'aux';
        }

        // console.log('analizePage', pageList.length, i, dex);
        // console.log(pairs[dex][pair].x.name, pageList[i]['dexerName'], pageList[i]['baseTokenSymbol'], pageList[i]['quotoTokenSymbol'], pageList[i]['volumeUsd24h'], pageList[i]['liquidity']);

        for (let pair in pairs[dex]) {
            if (datas24H_temp[dex][pair]['vol'] !== 0 && datas24H_temp[dex][pair]['liquidity'] !== 0) {
                continue;
            }

            if (pageList[i]['baseTokenSymbol'].indexOf(pairs[dex][pair].x.name) === 0 && pageList[i]['quotoTokenSymbol'].indexOf(pairs[dex][pair].y.name) === 0) {
                datas24H_temp[dex][pair]['vol'] = pageList[i]['volumeUsd24h'];
                datas24H_temp[dex][pair]['liquidity'] = pageList[i]['liquidity'];
            }
        }
    }

    console.log("datas24H_temp", datas24H_temp);
};

async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}





