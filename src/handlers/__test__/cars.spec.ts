import request from "supertest";
import app from "../../app";

describe("GET /cars", () => {
  it("should response with 200 as status code and return list of car", async () => {
    return request(app)
      .get("/api/cars")
      .set("Content-type", "application/json")
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.data.cars).toBeInstanceOf(Array);
      });
  });
});
