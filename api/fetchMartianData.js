/**
 * Fetch Martian Data - establishes functionality for retrieveing data from Martian weather api.
 * @module
 * @author Bradford Dean Wilson <bradford.dean.wilson@gmail.com>
 */
const fetch = require("node-fetch");
const formatQueryParams = require("../utils/formatQueryParams");

/**
 * Fetches Martian weather data from NASA insight API.
 * https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf
 * @return {Promise} Promise object with response data from the server
 */
function fetchMartianData() {
  //prettier-ignore
  let params = {
        api_key: "JRPWKpyWr5JcEdUsLMypoII5iBeMaSn1Oy94DnkF",
        feedtype: "json",
        ver: "1.0",
    };

  const endpoint = "https://api.nasa.gov/insight_weather/";
  params = formatQueryParams(params);

  return fetch(`${endpoint}?${params}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(
        "Failed to retrieve Martian data from the NASA Insight program"
      );
    })
    .catch((err) => {
      return { error: err };
    });
}

module.exports = { fetchMartianData };
