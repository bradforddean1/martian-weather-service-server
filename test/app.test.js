const assert = require("chai").assert;
const supertest = require("supertest");
const sinon = require("sinon");

const app = require("../app");
const fetchMartianData = require("../api/fetchMartianData");
const fetchTerranData = require("../api/fetchTerranData");

const insight200 = require("../mocks/insight200.json");
const meteostat200 = require("../mocks/meteostat200.json");

// 200 Tests
describe("GET weather-data", () => {
  describe("when valid data provided", () => {
    before(() => {
      let fetchMartianData_stub = sinon.stub(
        fetchMartianData,
        "fetchMartianData"
      );
      // prettier-ignore
      let fetchTerranData_stub = sinon.stub(
          fetchTerranData, 
          "fetchTerranData"
      );

      fetchMartianData_stub.returns(Promise.resolve(insight200));
      fetchTerranData_stub.returns(Promise.resolve(meteostat200));
    });

    after(() => {
      fetchMartianData.fetchMartianData.restore;
      fetchTerranData.fetchTerranData.restore;
    });

    it("returns response 200 with JSON data", () => {
      return supertest(app)
        .get("/martian-weather")
        .query({
          lat: "33.749",
          lon: "-84.388",
          dateEnd: "2019-09-28",
          dateStart: "2019-09-22",
        })
        .expect(200)
        .then((response) => {
          assert.include(response, [{ sol: "646", date: "2020-09-22" }]);
          assert.include(response, [{ sol: "652", date: "2020-09-28" }]);
          assert.length(response, 7);
        });
    });
  });

  // 500 tests
  describe("when calling meteostat or NASA api results in an error", () => {
    before(() => {
      let fetchMartianData_stub = sinon.stub(
        fetchMartianData,
        "fetchMartianData"
      );
      fetchMartianData_stub.returns(Promise.resolve("API Error"));
    });

    after(() => {
      fetchMartianData.fetchMartianData().restore;
    });

    it("route returns status 500 with error message", () => {
      fetchMatianData_stub.returns(formMockResponse(200, insight500));
      fetchTerranData_stub.returns(formMockResponse(200, meteostat500));

      return supertest(app)
        .get("/martian-weather")
        .query({
          lat: "33.749",
          lon: "-84.388",
          dateEnd: "2019-09-28",
          dateStart: "2019-09-22",
        })
        .expect(500, "API error");
    });

    // Timeout?

    // 400 tests
    describe("when client sends inappropriate params", () => {
      it("Returns response 400 and format requirements if date is in out of range.", () => {
        return supertest(app)
          .get("/martian-weather")
          .query({
            lat: "33.749",
            lon: "-84.388",
            dateEnd: "2030-09-28",
            dateStart: "2020-09-22",
          })
          .expect(400, "dateStart must be in YYYY-MM-DD format");
      });

      it("Returns response 400 and format requirements if date is in inappropriate format.", () => {
        return supertest(app)
          .get("/martian-weather")
          .query({
            lat: "33.749",
            lon: "-84.388",
            dateEnd: "09-28-2020",
            dateStart: "2020-09-22",
          })
          .expect(400, "dateStart must be in YYYY-MM-DD format");
      });

      it("Returns response 400 if lat/lon procded are not numeric", () => {
        return supertest(app)
          .get("/martian-weather")
          .query({
            lat: "BadLat",
            lon: "084.388",
            dateEnd: "2020-09-28",
            dateStart: "2020-09-22",
          })
          .expect(400, "lat must be numeric value");
      });

      it("Returns response 400 and error when required params are not provided.", () => {
        return supertest(app)
          .get("/martian-weather")
          .query({})
          .expect(400, "lat is required");
      });
    });
  });
});
