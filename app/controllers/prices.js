const getAddresses = require("../constants/addresses");
const { ChainIDs } = require("../constants/chainId");
const tokenPrices = require("../helpers/getTokenPrices");

let prices = {};

exports.calculateAndSave = async () => {
  try {
    // current date
    var date_ob = new Date();
    var date = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var strDate = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds).toString();

    var bnbPrice = await tokenPrices.fetchTokenPrices("BNB");
    var usdcPrice = await tokenPrices.fetchTokenPrices("USDC");
    var daiPrice = await tokenPrices.fetchTokenPrices("DAI");
    var usdtPrice = await tokenPrices.fetchTokenPrices("USDT");
    var wbtcPrice = await tokenPrices.fetchTokenPrices("WBTC");
    var wethPrice = await tokenPrices.fetchTokenPrices("WETH");
    var cakePrice = await tokenPrices.fetchTokenPrices("CAKE");
    var aptPrice = await tokenPrices.fetchTokenPrices("APT");

    prices = {
      date: strDate,
      bnbPrice: bnbPrice,
      apt: aptPrice,
      wbtc: wbtcPrice,
      weth: wethPrice,
      usdt: usdtPrice,
      usdc: usdcPrice,
      cake: cakePrice,
      dai: daiPrice,
    };

    console.log(prices);

  } catch (err) {
    console.log(err);
  }
};

exports.getPrices = (req, res) => {
  res.status(200).send(prices);
  return;
};
