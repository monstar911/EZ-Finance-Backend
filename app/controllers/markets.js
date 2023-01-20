
const historicalData = require("../helpers/getHistoricalMarketData");

let historical_data = {};

exports.calculateAndSave = async () => {
    try {
        historical_data = await historicalData.historicalData();

        console.log("historical_data", historical_data);

    } catch (err) {
        console.log(err);
    }
};

exports.getHistoricalMarketData = (req, res) => {
    res.status(200).send(historical_data);
    return;
};
