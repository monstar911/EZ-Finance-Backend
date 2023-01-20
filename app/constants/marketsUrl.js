
// https://coinmarketcap.com/exchanges/pancakeswap-aptos/
// https://coinmarketcap.com/dexscan/trending/all
// https://coinmarketcap.com/dexscan/networks/aptos?page=1&swap=pancakeswap-aptos
const marketsUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=aptos%2C%20bitcoin%2C%20weth%2C%20tether%2C%20usd-coin%2C%20dai&order=market_cap_desc&per_page=100&page=1&sparkline=false"

const getMarketsUrl = () => {
    return marketsUrl;

    throw Error("Don't support!");
};

module.exports = getMarketsUrl;