const tokenPriceUrls = {
    CAKE: {
        APIID: "pancakeswap-token",
        URL: "https://api.coingecko.com/api/v3/simple/price?ids=pancakeswap-token&vs_currencies=usd"
    },
    BNB: {
        APIID: "binancecoin",
        URL: "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd",
    },
    USDC: {
        APIID: "usd-coin",
        URL: "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd",
    },
    BUSD: {
        APIID: "binance-usd",
        URL: "https://api.coingecko.com/api/v3/simple/price?ids=binance-usd&vs_currencies=usd",
    },
    USDT: {
        APIID: "tether",
        URL: "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd",
    },
    DAI: {
        APIID: "dai",
        URL: "https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=usd",
    },
    WBTC: {
        APIID: "bitcoin",
        URL: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
    },
    WETH: {
        APIID: "weth",
        URL: "https://api.coingecko.com/api/v3/simple/price?ids=weth&vs_currencies=usd",
    },
    APT: {
        APIID: "aptos",
        URL: "https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=usd",
    },
};

const getTokenPriceUrls = (tokenName) => {
    if (tokenName === "CAKE") return tokenPriceUrls.CAKE;
    if (tokenName === "BNB") return tokenPriceUrls.BNB;
    if (tokenName === "USDC") return tokenPriceUrls.USDC;
    if (tokenName === "BUSD") return tokenPriceUrls.BUSD;
    if (tokenName === "USDT") return tokenPriceUrls.USDT;
    if (tokenName === "DAI") return tokenPriceUrls.DAI;
    if (tokenName === "WBTC") return tokenPriceUrls.WBTC;
    if (tokenName === "WETH") return tokenPriceUrls.WETH;
    if (tokenName === "APT") return tokenPriceUrls.APT;

    throw Error("Don't support!");
};

module.exports = getTokenPriceUrls;
