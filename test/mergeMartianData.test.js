// test shape of data and data placement.
const a = [
  {
    sol: "652",
    date: "2020-09-18",
    at: {
      avg: {
        mars: -65.002,
        earth: 22.1,
      },
      high: {
        mars: -15.653,
        earth: 27.2,
      },
      low: {
        mars: -96.111,
        earth: 18.4,
      },
    },
    pressure: {
      avg: {
        mars: 764.779,
        earth: null,
      },
      high: {
        mars: 779.0774,
        earth: null,
      },
      low: {
        mars: 734.7627,
        earth: null,
      },
    },
    wind: {
      avg: {
        mars: 6.579,
        earth: 9,
      },
      high: {
        mars: 18.59,
        earth: null,
      },
      low: {
        mars: 0.255,
        earth: null,
      },
      windDir: {
        mars: "WNW",
        earth: "NNW",
      },
    },
  },
];
// Test days offset, i.e. per the current example most recent sol has data invlaid
