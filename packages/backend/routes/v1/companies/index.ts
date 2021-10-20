import express from "express";
import type { Offers, Company } from "@instahome/types";

const router = express.Router();

const companies: Company[] = [
  { id: 1, name: "uem sunrise" },
  { id: 2, name: "sime darby" },
  { id: 3, name: "igb berhad" },
  { id: 4, name: "mah sing group" },
];

type DataType = { [key: number]: Offers[] };

const data: DataType = {
  1: [
    {
      adId: "standard",
      type: "xfory",
      eligibleLimit: 3,
      reduceCountBy: 1,
    },
  ],
  2: [
    {
      adId: "featured",
      type: "discount",
      newPrice: 299.99,
    },
  ],
  3: [
    {
      adId: "premium",
      type: "discountconditional",
      eligibleLimit: 4,
      newPrice: 379.99,
    },
  ],
  4: [
    {
      adId: "standard",
      type: "xfory",
      eligibleLimit: 3,
      reduceCountBy: 1,
    },
    {
      adId: "featured",
      type: "discount",
      newPrice: 299.99,
    },
    {
      adId: "premium",
      type: "discountconditional",
      eligibleLimit: 3,
      newPrice: 379.99,
    },
  ],
};

/* GET list of companies. */
router.get("/", function (_, res) {
  res.json(companies);
});

/* GET companies offer details. */
router.get("/:id", function (req, res) {
  res.json(data[parseInt(req.params.id)]);
});

export default router;
