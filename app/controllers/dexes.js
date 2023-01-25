
const historicalData = require("../helpers/getHistoricalDexScanAptosData");

let historical_data = {};

exports.scrapeAndSave = async () => {
    try {
        historical_data = await historicalData.historicalData();

        console.log("scrapeAndSave", historical_data);

    } catch (err) {
        console.log(err);
    }
};

exports.getHistoricalDexData = (req, res) => {
    res.status(200).send(historical_data);
    return;
};
