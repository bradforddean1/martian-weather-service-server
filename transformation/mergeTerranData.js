const dayjs = require("dayjs");
const degreesToBearing = require("../utils/degreesToBearing");

/**
 * Transforms and merges Terran weather data and updates the formed DayOfData Objects in the passed in array.
 * @param {array} rawData - Data to be transformed
 * @param {array} formedData - Object with the data in good form.
 */
function mergeTerranData(rawData, formedData) {
  for (i = 0; i < rawData.length; i++) {
    formedData[i].date = rawData[i].date;
    formedData[i].at.avg.earth = rawData[i].tavg;
    formedData[i].at.high.earth = rawData[i].tmax;
    formedData[i].at.low.earth = rawData[i].tmin;
    formedData[i].pressure.avg.earth = rawData[i].pres;
    formedData[i].wind.avg.earth = rawData[i].wspd;
    formedData[i].wind.windDir.earth = degreesToBearing(rawData[i].wdir);
  }
}

module.exports = mergeTerranData;
