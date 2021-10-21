import express from "express";
import router from "../";
import supertest from "supertest";

jest.mock("../../../../data", () => {
  return {
    __esModule: true,
    companies: [{ id: 1, name: "test company" }],
    companyOffers: { 1: [{ adId: "standard", type: "discount", newPrice: 1 }] },
  };
});

const app = express();
app.use("/", router);
const request = supertest(app);

describe("companies", () => {
  describe("validation", () => {
    it("invalid id should return correct error", async () => {
      const response = await request.get("/qwe");

      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({
        errors: [
          {
            location: "params",
            msg: "id must be a number",
            param: "id",
            value: "qwe",
          },
        ],
      });
    });
  });

  describe("success", () => {
    it("should return correct list of companies", async () => {
      const response = await request.get("/");

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([{ id: 1, name: "test company" }]);
    });

    it("should return correct company offer details", async () => {
      const response = await request.get("/1");

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([
        { adId: "standard", type: "discount", newPrice: 1 },
      ]);
    });

    it("should return correct company offer details when company id doesn't exist", async () => {
      const response = await request.get("/2");

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([]);
    });
  });
});
