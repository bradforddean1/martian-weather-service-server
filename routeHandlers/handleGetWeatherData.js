/**
 * Handler for the get /weather-data route
 * @module
 */

const fetchMartianWeather = require("../api/fetchMartianData");
const fetchTerranWeather = require("../api/fetchTerranData");
const mergeMartianData = require("../transformation/mergeMartianData");
const mergeTerranData = require("../transformation/mergeTerranData");
const defaultDayOfData = require("../transformation/defaultDayOfData");

/**
 * Handle get /weather-data route request
 * @param {number} lat - latitude of terran weather location
 * @param {number} lon - longitude of terran weather location
 * @param {string} dateStart - start date for date range to fetch
 * @param {string} dateStart - end date for or date range to fetch
 * @return {object} - earth and martian weather data
 */
async function handleGetWeatherData(lat, lon, dateStart, dateEnd) {
  const martianWeatherRes = fetchMartianWeather();
  const earthWeatherRes = fetchTerranWeather(lat, lon, dateStart, dateEnd);

  const numDays = dateStart.diff(dateEnd, "days") + 1;
  const days = [];
  for (i = 0; i < numDays; i++) {
    days.push(defaultDayOfData);
  }

  const martianWeather = await martianWeatherRes;
  if (!martianWeather.error) {
    mergeMartianData(martianWeather, days);
  }

  const earthWeather = await earthWeatherRes;
  if (!earthWeather.error) {
    mergeTerranData(earthWeather.data, days);
  }

  return days;
}

module.exports = handleGetWeatherData;
