const { ChainIDs } = require("./chainId");

const BSC_MAINNET = {
    BNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    ROUTER: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    USDC: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    BUSD: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    USDT: "0x55d398326f99059fF775485246999027B3197955",
    DAI: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    WBTC: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
};

const BSC_TESTNET = {
    BNB: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
    ROUTER: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
    USDC: "0x9555f469d2Fc19Fa85D0B6184C3685950DC99291",
    BUSD: "0x1092fd5A7d29bE377678a516895c6F9d9A773572",
    USDT: "0x7F17cC78546c5270ba58Ffa6543F0a0Aa522616F",
    DAI: "0x6d0893eE9FeAA890981Ed721569e8c82356E88b0",
};

const getAddresses = (chainID, name) => {
    if (chainID === ChainIDs.BSCmainnet) {
        if (name === "BNB") return BSC_MAINNET.BNB;
        if (name === "ROUTER") return BSC_MAINNET.ROUTER;
        if (name === "USDC") return BSC_MAINNET.USDC;
        if (name === "BUSD") return BSC_MAINNET.BUSD;
        if (name === "USDT") return BSC_MAINNET.USDT;
        if (name === "DAI") return BSC_MAINNET.DAI;
    }

    if (chainID === ChainIDs.BSCtestnet) {
        if (name === "BNB") return BSC_TESTNET.BNB;
        if (name === "ROUTER") return BSC_TESTNET.ROUTER;
        if (name === "USDC") return BSC_TESTNET.USDC;
        if (name === "BUSD") return BSC_TESTNET.BUSD;
        if (name === "USDT") return BSC_TESTNET.USDT;
        if (name === "DAI") return BSC_TESTNET.DAI;
    }

    throw Error("Don't support!");
};

module.exports = getAddresses;