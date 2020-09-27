/**
 * Merges martian weather data to the passd in array array of standarized
 * objects handled by the client.
 * @param {object} rawData - Data to be transformed
 * @param {array} formedData - Object with the data in good form.
 */
function mergeMartianData(rawData, formedData) {
  //prettier-ignore
  const keys = Object.keys(rawData);
  for (let i = 0; i < keys.length - 2; i++) {
    formedData[i].sol = keys[i];

    formedData[i].at.avg.mars = rawData[keys[i]].AT.av;
    formedData[i].at.high.mars = rawData[keys[i]].AT.mx;
    formedData[i].at.low.mars = rawData[keys[i]].AT.mn;

    formedData[i].pressure.avg.mars = rawData[keys[i]].PRE.av;
    formedData[i].pressure.high.mars = rawData[keys[i]].PRE.mx;
    formedData[i].pressure.low.mars = rawData[keys[i]].PRE.mn;

    formedData[i].wind.avg.mars = rawData[keys[i]].HWS.av;
    formedData[i].wind.high.mars = rawData[keys[i]].HWS.mx;
    formedData[i].wind.low.mars = rawData[keys[i]].HWS.mn;
    formedData[i].wind.windDir.mars =
      rawData[keys[i]].WD.most_common.compass_point;
  }
}

module.exports = mergeMartianData;
