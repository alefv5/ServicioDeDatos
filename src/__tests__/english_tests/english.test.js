const request = require("supertest");
const application = require("../../Application");

describe("Test english level resource", () => {
  test("It should response the GET all english levels", done => {
    request(application)
      .get("/api/english-levels")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
