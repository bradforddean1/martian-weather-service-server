const assert = require("chai").assert;
const handleGetWeatherData = require("../routeHandlers/handleGetWeatherData");

describe("get weather data", () => {
  it("should return an array of length equal to the number of days in date range given", () => {
    handleGetWeatherData().then((dataArray) => {
      assert.equal(dataArray.length, 7);
    });
  });
});

// return error if number of days recieved do not match

// handle most recent day mismatch... i.e most recent martian day unavailble

// correct objects in order, i..e test sol and date of each object

