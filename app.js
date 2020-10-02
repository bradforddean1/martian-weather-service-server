require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dayjs = require("dayjs");

const handleGetWeatherData = require("./routeHandlers/handleGetWeatherData");

const app = express();
app.use(morgan("dev"));
app.use(cors());

app.get("/weather-data", (req, res) => {
  const lon = parseFloat(req.query.lon);
  const lat = parseFloat(req.query.lat);
  let dateStart = req.query.dateStart;
  let dateEnd = req.query.dateEnd;

  // validate req params present
  resQuery = { lon: lon, lat: lat, dateStart: dateStart, dateEnd: dateEnd };
  for (key in resQuery) {
    if (!resQuery[key]) {
      return res.status("400").send(`${key} is required`);
    }
  }

  // parse date params
  dateStart = dayjs(dateStart, "YYYY-MM-DD", true);
  dateEnd = dayjs(dateEnd, "YYYY-MM-DD", true);

  // validate param content
  let clientError = false;

  if (Number.isNaN(lon))
    return res.status("400").send("lon must be numeric value");

  if (Number.isNaN(lat))
    return res.status("400").send("lat must be numeric value");

  if (!dateStart.isValid())
    return res.status("400").send("dateStart must be in YYYY-MM-DD format");

  if (!dateEnd.isValid())
    return res
      .status("400")
      .send((clientError = "dateEnd must be in YYYY-MM-DD format"));

  // query and return terran and martian weather data
  handleGetWeatherData(lat, lon, dateStart, dateEnd)
    .then((planetaryData) => {
      res.json(planetaryData); //
    })
    .catch((err) => {
      res.send(err)
      // res.status(500).send("Failed to retrieve weather data from service");
    });
});

module.exports = app;
